import express from "express"
import authenticate from "./userRoute"
import user from "./user"
const router = express.Router()

export default():express.Router =>{
  authenticate(router)
  user(router)
  return router
}