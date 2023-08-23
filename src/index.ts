import express, { urlencoded } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import http from "http";
import {config} from "dotenv";
import morgan from "morgan"
import helmet from "helmet"
import compression from "compression";
import { connectDB } from "./config/db.config";
import router from "./routes/index";

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
app.use(helmet())
app.use(morgan(":date :: :method :: :response-time"))
app.use("/api/v1", router())

connectDB()

server.listen(PORT, ()=>{
  console.log(`server listening on localhost:${PORT}`)
})