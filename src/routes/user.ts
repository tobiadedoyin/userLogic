import { getAllUser } from "../controller/index";
import {Router} from "express"
import { isAuthenticated } from "../middleware";

const router = Router()

export default (router: Router)=>{
  router.get("/users", isAuthenticated, getAllUser)
}