import express,{NextFunction, Request, Response} from "express"
import { merge, get, String } from "lodash"
import { handleResponse } from "./userAuthentication"
import { apiCodes } from "../utils/apiCodes"
import { getUserBySessionToken } from "../service/coreService"


function serverErr(res:Response, error:any){
  console.log((error.message))
  return handleResponse(res, apiCodes.serverError, `${error.message}`)
}

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
  serverErr(res, error)
 }
}

interface AuthenticatedRequest extends Request {
  identity?: {
    _id: string;
    // Other properties related to user identity
  };
}

export const isOwner = async(req: AuthenticatedRequest, res:Response, next: NextFunction) =>{
  try{
    const { id } = req.params;
    const owner = get(req, "identity._id") as string

    if(!owner){
      return handleResponse(res, apiCodes.unAuthorized, "not user")
    }

    if(owner.toString() !== id){
      return handleResponse(res, apiCodes.unAuthorized, "id mismatch")
    }
    console.log(owner)
    next()
  }catch(error:any){
   serverErr(res, error)
  }
}