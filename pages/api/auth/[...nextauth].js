import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";



export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'Ov23ctSS4QgCoVFEvWBu',
      clientSecret: 'f231d03c7bcc27383305870145f4af2a7b0ca1dd',
    }),
  ],
  secret : 'qwerty1234!@',
  adapter : MongoDBAdapter(connectDB)//로그인 후 글추가하면 회원정보도 같이 묶임
};
export default NextAuth(authOptions); 