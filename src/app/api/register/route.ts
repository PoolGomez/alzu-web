import { User } from "@/models/User";
import mongoose from "mongoose";

export async function POST(req: Request){
    const mongoURL = process.env.MONGO_URL;
    if (!mongoURL) {
        throw new Error("No se ha proporcionado una URL de MongoDB en la variable de entorno MONGO_URL.");
    }
    const body = await req.json();
    mongoose.connect(mongoURL);
    const createdUser = await User.create(body);


    return Response.json(createdUser);
}