import express from "express"
import { protecter } from "../protectedrouter/protecter.js"
import { getMessage, removeMessage, sendMessage } from "../controllers/message.controller.js"

const router =express.Router()
router.get('/messages/:id',protecter,getMessage)
router.post('/add/:reciveruser',protecter,sendMessage)
router.delete('/remove/:id',protecter,removeMessage)

export default router;