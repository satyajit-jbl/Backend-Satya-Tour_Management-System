import {Server} from "http"
import mongoose from "mongoose";
import app from "./app";
import dotenv from 'dotenv';

let server: Server;
dotenv.config();



const startServer = async () => {
try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("Connected to DB !!");
    
    server = app.listen(5000, ()=>{
        console.log("Server is listening post 5000");
    })
} catch (error) {
    console.log(error);
}
}

startServer();

