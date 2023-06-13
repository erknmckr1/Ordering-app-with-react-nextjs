import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import clientPromise from "@/util/mongo"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import dbConnect from "@/util/dbConnect"
import User from "@/models/User"
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
dbConnect();

export const authOptions = {
    // Configure one or more authentication providers
    //adapter:MongoDBAdapter(clientPromise),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      CredentialsProvider({
        name: "Credentials",
  
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        // req ıle sıgnIn metodu ıle gonderılen verıler tutulur 
        async authorize(credentials, req) {
          const email = credentials.email;
          const password = credentials.password;
          const user = await User.findOne({ email: email });
          if (!user) {
            throw new Error("Account not found!");
          }
          if (user) {
            return signInUser({ user, password });
          }
        },
      }),
    ],
    pages: {
      signIn: "/auth/login",
    },
    database: process.env.MONGODB_URI,
    secret:"secret", 
  }

  const signInUser = async ({ user, password }) => {
    const isMAtch = await bcrypt.compare(password, user.password);
    if (!isMAtch) {
      throw new Error("Incorrect password!");
    }
    return user;
  };
  export default NextAuth(authOptions)