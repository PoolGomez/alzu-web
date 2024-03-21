import { User } from "@/models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req: Request){
    const mongoURL = process.env.MONGO_URL;
    if (!mongoURL) {
        throw new Error("No se ha proporcionado una URL de MongoDB en la variable de entorno MONGO_URL.");
    }
    const body = await req.json();
    mongoose.connect(mongoURL);
    const pass = body.password;
    if(!pass?.length || pass.length < 5){
        new Error('Password must be at least 5 character')
    }

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);

    const createdUser = await User.create(body);
    return Response.json(createdUser);
}