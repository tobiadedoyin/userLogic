import {Request, Response, NextFunction} from "express";
import { handleResponse } from "../middleware/userAuthentication";
import { deleteUser, getUser, getUserById, updateUser } from "../service/coreService";
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

export const removeUser = async(req:Request, res:Response)=>{
  try{
    const {id} = req.params
   const del  = await deleteUser(id)
   return handleResponse(res, apiCodes.success, "user deleted successfully", del)
  }catch(error:any){
    console.log(error.message)
    return handleResponse(res, apiCodes.serverError, `${error.message}`)
  }
}


export const update = async (req:Request, res:Response) =>{
  try{
    const {id} = req.params;
    const username: string = req.body.username;
    if(!username){
      return handleResponse(res, apiCodes.unAuthorized, "username is required")
    }

    const value = await getUserById(id) as any
    value.username = username
    await value?.save()

    return res.json(value)
  }catch(error:any){
    console.log(error.message)
    return handleResponse(res, apiCodes.serverError, `${error.message}`)
  }
}