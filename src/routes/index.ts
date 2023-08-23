import express from "express"
import authenticate from "./userRoute"
const router = express.Router()

export default():express.Router =>{
  authenticate(router)
  return router
}