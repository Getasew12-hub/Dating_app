import express from  "express"
import { Signup,Login,Logout,checkAuth } from "../controllers/auth.controller.js";
import { protecter } from "../protectedrouter/protecter.js";

const router=express.Router()

router.post("/signup",Signup)
router.post("/login",Login)
router.post("/logout",Logout)

router.get('/checkauth',protecter,checkAuth)
export default router;