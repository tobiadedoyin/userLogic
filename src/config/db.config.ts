import mongoose from "mongoose";
import { config } from "dotenv";

config()

const MONGODB_URI=process.env.MONGODB_URI as string

export const connectDB = async()=>{
    await mongoose.connect(MONGODB_URI)
    console.log("database connected")
    mongoose.connection.on("error", (error: Error) =>{
     console.log(error.message)
    }
    )  
}