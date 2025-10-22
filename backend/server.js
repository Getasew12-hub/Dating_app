import express from "express";
import env from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
// routes
import authRouter from "./routers/auth.router.js"
import usersRouter from "./routers/users.router.js"
import messageRouter from "./routers/message.router.js"
import { conneDb } from "./config/db.js";
import Cloudinary from "./config/cloudinary.js"
import matchRouter from "./routers/match.router.js"
import { app,server } from "./config/soket.js";
import passport from "passport";
import AuthgoogleRouter from "./routers/authgoogleRouter.js"
env.config()

const __directry=path.resolve()
const port=5000;
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'10mb'}))
app.use(cookieParser())
app.use(passport.initialize());
Cloudinary()

app.use("/api/auth",authRouter)
app.use("/api/authgoogle",AuthgoogleRouter)
app.use("/api/users",usersRouter)
app.use("/api/messages",messageRouter)
app.use("/api/match",matchRouter)

if(process.env.NODE_ENV=='production'){
    app.use(express.static(path.join(__dirname,'frontend/dist')));

    app.use((req,res)=>{
        res.sendFile(path.join(__dirname,'fontend','dist','index.html'))
    })
}
server.listen(port,()=>{
    console.log('your server is runnig on port:'+port)
    conneDb()
})