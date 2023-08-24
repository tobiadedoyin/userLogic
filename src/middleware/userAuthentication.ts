import crypto from "crypto";
import { Response } from "express";
import { config } from "dotenv";
config()

export const random = crypto.randomBytes(128).toString('base64')
const SECRET =process.env.SECRET || "tobilearning"

export const authentication = (salt: string, password: string)=>{
  return crypto.createHmac("sha256", [salt, password].join("/")).update(SECRET).digest("hex")
}

export const handleResponse = (res: Response, statusCode: number,  message: string, data:any = {}, extraFields: boolean = true) =>{
  if(extraFields){
   return res.json({
      statusCode, 
      message,
      data
    })
  }
  return res.json(data)

}