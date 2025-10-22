import { create } from "zustand";
import axios from "../libe/axios"
import toast from "react-hot-toast";
import userStore from "./user";
import messagestore from "./message";

const useMatch=create((set,get)=>({
    profileLoad:false,
    loadding:false,
    SwipeDrictionFeadback:null,
    Match:[],
   userProfile:[],
 
    getMatchs:async () => {
         if(get().Match.length>0) return
        
        set({loadding:true})
        
        try {
           
           const response=await axios.get("/match/user");
           
           set({Match:response.data})
        } catch (error) {
            set({Match:[]});
            toast.error(error.response.data.error || "Faild to get matchs")
        }finally{
            set({loadding:false})
        }
    },
    getUserprofile:async () => {
         if(get().userProfile.length>0) return
        
        set({profileLoad:true})
        try {
           const response=await axios.get("/match/profile");
           
           set({userProfile:response.data})
        } catch (error) {
            set({userProfile:[]});
            toast.error(error.response.data.error || "Faild to get match user")
        }finally{
            set({profileLoad:false})
        }
    },
    SwipeLeft:async (user) => {
        try {
            const {_id}=user;
            
            set({SwipeDrictionFeadback:"Liked!"})
        const response= await axios.post(`/match/swipe-left/${_id}`)
         const userisExist= get().Match.some((val)=> val._id==_id);
        if(!userisExist){

            set((pre)=>({
                Match:[...pre.Match,user]
            }));
        }

       
        } catch (error) {
            console.log('error on swipe left',error.response.data.error)
        }finally{
            setTimeout(() => {
                set({SwipeDrictionFeadback:null})
            }, 1500);
        }
    },
    SwipeRight:async (user) => {
        
        try {
            const {_id}=user;
            
            set({SwipeDrictionFeadback:"Unliked!"})
         await axios.post(`/match/swipe-right/${_id}`)
        } catch (error) {
            console.log('error on swipe right',error.response.data.error)
        }finally{
            setTimeout(() => {
                set({SwipeDrictionFeadback:null})
            }, 1500);
        }
    },
    Matchfound:()=>{
       
        const socket=userStore.getState().socket;
       
        if(!socket) return;
        socket.on('matchfound',({id,name,user,type})=>{
            if(type=="ok"){
           const newuser={...user,isMatch:'like'};
            set((pre)=>({
        Match:[...pre.Match,newuser]
      }))
            }
          
           const newuser={...user,isMatch:'match'}
            if(id==userStore.getState().user._id){
      set((pre)=>({
        Match:[...pre.Match,newuser]
      }))
      console.log("after update the match found is this",get().Match)
            toast.success(`New match with ${name}`,{id:'usermatch'});
            }
            
        })
    },
    removeSocket:()=>{
 
const socket=userStore?.getState()?.socket;
   socket && socket.off('matchfound')
    }

}))


export default useMatch;