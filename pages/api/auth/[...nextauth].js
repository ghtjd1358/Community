import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'Ov23ctSS4QgCoVFEvWBu',
      clientSecret: 'f231d03c7bcc27383305870145f4af2a7b0ca1dd',
    }),
    
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const db = (await connectDB).db('forum(next)');
        const user = await db.collection('user_cred').findOne({email : credentials.email})
        if (!user) {
          console.log('해당 이메일은 없음');
          return null;
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비번틀림');
          return null;
        }
        return user;
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
  },

  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.user = {
          name: user.name,
          email: user.email,
          role: user.role || null, // role 필드가 없으면 null로 처리
        };

        // GitHub로 로그인했을 때 이미지 추가
        if (account?.provider === 'github') {
          token.user.image = user.image || account.image || null;
        }
      }
      return token;
    },
    
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  secret: 'qwerty1234!@',
  adapter: MongoDBAdapter(connectDB),

};

export default NextAuth(authOptions);
