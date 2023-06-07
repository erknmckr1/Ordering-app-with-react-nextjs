import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import clientPromise from "@/util/mongo"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
export const authOptions = {
    // Configure one or more authentication providers
    adapter:MongoDBAdapter(clientPromise),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      // ...add more providers here
    ],
  }
  export default NextAuth(authOptions)