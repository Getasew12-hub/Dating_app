import express from "express"
import { protecter } from "../protectedrouter/protecter.js";
import {updateProfile} from "../controllers/user.controller.js"

const router=express.Router()
router.patch("/update",protecter,updateProfile)

export default router;