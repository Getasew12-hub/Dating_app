import {create, useStore} from "zustand";
import axios from "../libe/axios"
import userStore from "./user";
import {io} from "socket.io-client"


const BASE_URL='http://localhost:5000'


const messagestore=create((set,get)=>({
    message:[],
    loadding:false,
    messageLoad:false,
    SelectedUser:null,
    newMatcher:null,

    GetMessages:async (userid) => {
        set({loadding:true,SelectedUser:userid})
        
        try {
        const response=await axios.get(`/messages/messages/${userid}`);
         set({message:response.data})
        } catch (error) {
            console.log('error on get message',error);
            set({message:[]})
        }finally{
            set({loadding:false})
        }
    },
    SendMessage:async (id,content,senderid) => {
        set({messageLoad:true})
       
        try {
            set((pre)=>({message:[...pre.message,{senderuser:senderid,reciveruser:id,message:content}]}))
             const response=await axios.post(`/messages/add/${id}`,{messages:content});
        } catch (error) {
             console.log('error on send message');
        }finally{
            set({messageLoad:false})
        }
    },
    onLinemessage:async (params) => {
        const socket=userStore.getState().socket;
        socket.on('newmessage',({addmesage})=>{
           
            if(addmesage.senderuser!==get().SelectedUser) return
        
            set((pre)=>({message:[...pre.message,addmesage]}))
        })
    },
    unsubscribeOnliechat:async () => {

         const socket=userStore.getState()?.socket;
         if(socket){
            socket.off('newmessage');
         }
    }
}))


export default messagestore;