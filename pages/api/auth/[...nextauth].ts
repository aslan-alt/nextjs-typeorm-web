import NextAuth, {type DefaultSession} from 'next-auth';
import {AuthOptions} from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: {
      /** The user's id. */
      id: string;
    } & DefaultSession['user'];
  }
}

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authOptions);
