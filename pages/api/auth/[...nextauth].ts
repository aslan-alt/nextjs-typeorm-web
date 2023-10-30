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
  callbacks: {
    async jwt({token, account}) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({session, token}) {
      // Send properties to the client, like an access_token from a provider.
      // @ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
export default NextAuth(authOptions);
