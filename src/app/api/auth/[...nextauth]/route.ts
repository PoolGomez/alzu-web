import clientPromise from "@/libs/mongoConnect";
import { User } from "@/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
// import mongoose from "mongoose";
import * as mongoose from "mongoose";
import nextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = nextAuth({
    secret: process.env.SECRET_KEY,
    adapter: MongoDBAdapter(clientPromise) as Adapter,
    providers: [
        GoogleProvider({
          clientId : process.env.GOOGLE_CLIENT_ID || '',
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        CredentialsProvider({
            name: 'Credentials',
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
})

export{handler as GET, handler as POST}