import React, { useEffect, useRef, useState } from 'react'
import NavBar from "../controller/NavBar"
import InputMessage from '../controller/InputMessage';
import {  Link, useParams } from 'react-router-dom';
import useMatch from '../store/useMatch';
import userStore from '../store/user';
import messageStore from "../store/message"
import { ArrowLeft, ArrowRight, Frown, Loader } from 'lucide-react';


function ChatPage() {

  const scrollbar=useRef(null)

  const [loadis,setloadis]=useState(false)
  const {Match,getMatchs,loadding}= useMatch()
  const {message,loadding:load,GetMessages,onLinemessage,unsubscribeOnliechat}=messageStore()
  const {user}=userStore()
 const {id}=useParams()
 const usermatch=Match.find(val=> val._id==id)

 useEffect(()=>{
  if(user && id){
    getMatchs()
    GetMessages(id)
    onLinemessage()
    
  }
  return ()=> unsubscribeOnliechat()
 },[getMatchs,user,onLinemessage,onLinemessage,id])
 
  useEffect(()=>{
   
    if(scrollbar.current){
      
   
     scrollbar.current.scrollTop=scrollbar.current.scrollHeight
    
    }
  },[message,scrollbar.current,loadding,load])

if(loadding || load) return <LoaddingContent/>;
if(!usermatch ) return <Nomatchfound/>

 
  return (
    <div className='flex h-screen overflow-hidden flex-col'>
      
      <div  className='w-full relative'>
           <NavBar inprofile={true}/>
       </div>

        <div className=' flex-grow flex max-w-4xl w-full mx-auto p-4 space-y-3 md:space-y-6 overflow-hidden flex-col '>
           <div className='w-full  flex items-center gap-2 p-2.5 bg-white rounded-lg shadow-lg shadow-gray-400'>
            <div className='flex justify-center items-center gap-2'>
                <div className='h-8 w-8 md:h-10 md:w-10 bg-gray-400 flex justify-center items-center text-2xl font-bold text-white rounded-full overflow-hidden'>
                  {usermatch.img ? (
                    <img src={usermatch.img} alt='user profile image'/>
                  ):(
                  usermatch.name.charAt(0).toUpperCase()
                  )}
                </div>
                <p className='font-semibold'>{usermatch.name}</p>
             </div>   
           </div>

           <div className='flex-grow bg-white space-y-4 overflow-y-auto  w-full shadow-lg p-4 shadow-gray-400 rounded-lg hiddenscroll' ref={scrollbar} >
           {message.length===0 ? (
            <div className='text-center text-gray-500 font-semibold'>
              Start conversation with {usermatch.name}
            </div>
           ):(
             
            message.map((val)=>
           <div className={`flex ${val.senderuser==user._id ? "justify-end" : "justify-start  "}  `}>
                 <div className={`${val.senderuser==user._id ? "bg-gray-400" : "bg-pink-500 "} max-w-52 sm:max-w-60 md:max-w-96  text-white rounded p-2 w-fit`}>
                  {val.message}
                 </div>

           </div>)
          )}
           </div>

           <InputMessage mucherid={usermatch._id} userid={user._id}/>
        </div>

    </div>
  )
}

export default ChatPage;


const LoaddingContent=()=>{
  return <div className='flex justify-center items-center h-screen overflow-hidden'>
         <div className='bg-white p-8 shadow-md shadow-gray-500 rounded-md flex flex-col justify-center items-center gap-2'>
          <Loader size={35} className='animate-spin text-pink-500'/>
          <p className='font-semibold'>Loadding</p>
          
         </div>
  </div>
}


const Nomatchfound=()=>{
  return <div className='flex justify-center items-center h-screen overflow-hidden'>
    <div className='bg-white p-8 shadow-md shadow-gray-500 rounded-md flex flex-col justify-center items-center  space-y-5'>
      <Frown size={55} className='text-pink-500'/>

       <p className='font-bold text-xl md:text-2xl'>Woop, No user is found!</p>

        <Link to={"/"}> <button className='flex justify-center items-center gap-3 bg-pink-500 text-white  p-2 rounded-md'>Back to HomePage <ArrowRight/></button>  </Link>
    </div>
  </div>
}



