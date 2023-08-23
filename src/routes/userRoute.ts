import User from "../controller/user.controller";
import express from "express"

export default (router: express.Router ) =>{
  router.post("/register", User.register)
}