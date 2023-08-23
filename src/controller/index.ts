import {Request, Response, NextFunction} from "express";
import { handleResponse } from "../middleware/userAuthentication";
import { getUser } from "../service/coreService";
import { apiCodes } from "../utils/apiCodes";

export const getAllUser = async(req: Request, res:Response) =>{
  try{
    const user = await getUser()
    return handleResponse(res, apiCodes.success, "list of users", user )
  }catch(error:any){
    console.log(error.message)
    return handleResponse(res, apiCodes.serverError, `${error.message}`)
  }
 
}