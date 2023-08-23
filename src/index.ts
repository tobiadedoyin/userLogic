import express, { urlencoded } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import http from "http";
import {config} from "dotenv";
import compression from "compression";
import { connectDB } from "./config/db.config";

config()
const app = express();
const PORT = process.env.PORT || 4050

const server = http.createServer(app)
app.use(cors({
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(compression())

connectDB()

server.listen(PORT, ()=>{
  console.log(`server listening on localhost:${PORT}`)
})