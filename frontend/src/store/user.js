import {create} from "zustand";
import axios from "../libe/axios"
import toast from "react-hot-toast";
import {io} from "socket.io-client"


const BASE_URL='https://dating-app-cjii.onrender.com/'
const userStore=create((set,get)=>({
    loadding:false,
    user:null,
    checkauth:true,
  socket:null,
  onlineUsers:[],
    Signup:async (data) => {
         set({loadding:true})
        try {
            const {name,password,email,age,gender,preferece}=data;
           
             if(!name || !password || !email || !age || !gender || !preferece)  return toast.error("All input is reqiured")

               
            const response=await axios.post("/auth/signup",{name,password,email,age,gender,preferece});

             toast.success('Successfully signup')
            set({user:response.data.user})

            get().SocketConnection()
        } catch (error) {
            console.log("error on sign up ",error.response.data.error);
            toast.error(error.response.data.error || 'Faild to sing up')
        }finally{
            set({loadding:false})
        }
    },
    Login:async (data) => {
        set({loadding:true})
        try {
            
            const {email,password}=data;
            if(!email || !password) return toast.error('All input is reqiured')

            const response=await axios.post("/auth/login",{email,password});
           toast.success('Successfully login')
            set({user:response.data.user})
             get().SocketConnection()
        } catch (error) {
             console.log("error on login ",error.response.data.error);
            toast.error(error.response.data.error || 'Faild to login')
            
        }finally{
            set({loadding:false})
        }
    },
    Logout:async () => {
        set({loadding:true})
        try {
           
            const response=await axios.post("/auth/logout");
               toast.success('Successfully logout')
            set({user:null})
            get().SocketDisconnect()
        } catch (error) {
             console.log("error on logot ",error);
            toast.error(error.response.data.error || 'Faild to logout')
            
        }finally{
            set({loadding:false})
        }
    },
    CheckAuth:async () => {
        set({checkauth:true})
        try {
           
            const response=await axios.get("/auth/checkauth");

            set({user:response.data.user})
             get().SocketConnection()
        } catch (error) {
             console.log("error on check auth ",error.response.data.error);
            
            
        }finally{
            set({checkauth:false})
        }
    },
  UpdateProfile:async (data) => {
    set({loadding:true})
    try {
        const {gender,img,age,preferece,bio,name}=data;

        const response=await axios.patch("/users/update",{gender,img,age,preferece,bio,name})

        set({user:response.data.user})
        toast.success('Successfully updated')
    } catch (error) {
        console.log("error on update profile",error);
        toast.error(error.response.data.error || "Faild to update profile")
    }finally{
set({loadding:false})
    }
  },

  SocketConnection:()=>{
    if(!get().user || get().socket?.connected) return;
    const socket=io(BASE_URL,{
        query:{
            userid:get().user._id,
        }
    });
    socket.connect();
    
    set({socket:socket});

    socket.on('connUser',(user)=>{
       
        set({onlineUsers:user})
    })
  },
  SocketDisconnect:()=>{
    console.log("now i am call so you can work on di")
    if(get().socket?.connected) get().socket.disconnect();
    set({socket:null})
  }

}))


export default userStore;