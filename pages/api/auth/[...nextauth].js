import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'Ov23ctSS4QgCoVFEvWBu',
      clientSecret: 'f231d03c7bcc27383305870145f4af2a7b0ca1dd',
    }),
  ],
  secret : 'ghtjd1358!'
};
export default NextAuth(authOptions); 