// COPIADO
import clientPromise from "@/libs/mongoConnect";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
// import mongoose from "mongoose";
import * as mongoose from "mongoose";
import nextAuth, { getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions ={
  secret: process.env.SECRET_KEY,
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
      GoogleProvider({
        clientId : process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
      }),
      CredentialsProvider({
          name: 'Credentials',
          id: 'credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "correo@ejemplo.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const email = credentials?.email;
            const password = credentials?.password;
            const mongoURL = process.env.MONGO_URL;
            if (!mongoURL) {
                throw new Error("No se ha proporcionado una URL de MongoDB en la variable de entorno MONGO_URL.");
            }
            mongoose.connect(mongoURL);
            const user = await User.findOne({email});
            const passwordOk = user && bcrypt.compareSync(password || '', user.password);

            if(passwordOk){
              return user;
            }
            return null
          }
      })
  ]
}

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

const handler = nextAuth(authOptions);

export{handler as GET, handler as POST}