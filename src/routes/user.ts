import { getAllUser, removeUser, update } from "../controller/index";
import {Router} from "express"
import { isAuthenticated, isOwner} from "../middleware";

const router = Router()

export default (router: Router)=>{
  router.get("/users", isAuthenticated, getAllUser)
  router.delete("/users/:id", isAuthenticated,  removeUser)
 router.put("/users/:id", isAuthenticated, update )
}