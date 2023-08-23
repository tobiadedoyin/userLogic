import express,{NextFunction, Request, Response} from "express"
import { merge, get } from "lodash"
import { handleResponse } from "./userAuthentication"
import { apiCodes } from "../utils/apiCodes"
import { getUserBySessionToken } from "../service/coreService"

export const isAuthenticated = async(req:Request, res:Response, next: NextFunction)=>{
 try{
 const sessionToken = req.cookies["auth"]
  if(!sessionToken){
    return handleResponse(res, apiCodes.notFound, "token not found")
  }

  const existUser = await getUserBySessionToken(sessionToken);
  if(!existUser){
    return handleResponse(res, apiCodes.notFound, "user does not exist")
  }

 merge(req, {identity: existUser })
return next()

 }catch(error:any){
  console.log((error.message))
  return handleResponse(res, apiCodes.serverError, `${error.message}`)
 }
}