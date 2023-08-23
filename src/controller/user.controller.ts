import { Request, Response, NextFunction } from "express";
import { authentication, handleResponse, random } from "../middleware/userAuthentication";
import { createUser, getUserByEmail } from "../service/coreService";
import { apiCodes } from "../utils/apiCodes";
import { inputValidation } from "../validator/inputValidation";

class User{
  
   static async register(req: Request, res: Response, next: NextFunction) {
   try{
    const {username, email, password} = req.body;
     const userInput = {username, email, password}
     const validation = inputValidation.safeParse(userInput)

     if(!validation.success){
      return  res.status(400).json({
       message: validation.error.issues[0].message
      })
     }
  

    if(!username || !email || !password){
      return  handleResponse(
        res,
        apiCodes.forbidden,
        "username, email, password is required"
        )} 
    
    const existUser = await getUserByEmail(email)
    if(existUser){
      return handleResponse(res, apiCodes.conflict, "email already exist")
    }
    const salt = random;
    const user = await createUser({username, email, authentication:{salt, password:authentication(salt, password)} })
    return handleResponse(res, apiCodes.created, "user registered", user)

   }catch(error: any){
    console.log(error.message)
    return res.status(500).json(error.message)
   } 
  }

  static async login(req:Request, res:Response){
    try{
      const {email, password} = req.body

      if(!email ||  !password){
        return handleResponse(res, apiCodes.forbidden, "username and password cannot be empty")
      }

      const existUser = await getUserByEmail(email).select('+authentication.salt +authentication.password')
      console.log(existUser)
      if(!existUser){
        return handleResponse(res, apiCodes.notFound, "email not found")
      }
     
      const expectedHash = authentication(existUser.authentication.salt, password)

      if(existUser.authentication.password !== expectedHash ){
        return handleResponse(res, apiCodes.notFound, "incorrect password")
      }

      const salt = random;
      existUser.authentication.sessionToken = authentication(salt, existUser._id.toString())

      await existUser.save()
      res.cookie("auth", existUser.authentication.sessionToken, {domain: "localhost", path: "/"})
      return handleResponse(res, apiCodes.success, `WELCOME ${existUser.username}`, existUser)

    }catch(error: any){
      console.log(error.message)
      return handleResponse(res, apiCodes.serverError, `${error.message}`, );
    }
    
  }
}

export default User;