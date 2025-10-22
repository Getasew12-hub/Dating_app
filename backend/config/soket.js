import {Server} from "socket.io";
import express from "express";
import {createServer} from "http";
import env from "dotenv"
env.config()
const app=express();
const server=new createServer(app);

const io=new Server(server,{
    cors:{
     origin:process.env.SOCKET_CORS,
     credentials:true,
    }
})

const connectionMap={};
export function GetUsers(id){
    return connectionMap[id];
}
io.on('connection',(socket)=>{
   
    const getuser=socket.handshake.query.userid;
   
    if(getuser){
        connectionMap[getuser]=socket.id;

        io.emit('connUser',Object.keys(connectionMap));
    }


 socket.on('disconnect',()=>{

 delete connectionMap[getuser];
 io.emit('connUser',Object.keys(connectionMap))
 })
})


export {app,io,server};