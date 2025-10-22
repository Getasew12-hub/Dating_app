import express from "express";
import { protecter } from "../protectedrouter/protecter.js";
import { getMatchusers, getUserPro, swipeLeft, swipeRight } from "../controllers/match.controller.js";

const router=express.Router();
router.post('/swipe-right/:id',protecter,swipeRight)
router.post('/swipe-left/:id',protecter,swipeLeft)

router.get("/user",protecter,getMatchusers)
router.get("/profile",protecter,getUserPro)
export default router;