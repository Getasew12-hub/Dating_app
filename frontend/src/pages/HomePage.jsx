import React, { useEffect } from 'react'
import NavBar from '../controller/NavBar'
import { useState } from 'react'
import Sidebar from '../controller/Sidebar'
import useMatch from '../store/useMatch'
import { Frown } from 'lucide-react'
import SwipeUse from '../controller/SwipeUse'
import userStore from '../store/user'

function HomePage() {
  const {profileLoad,userProfile,getUserprofile,Matchfound,removeSocket,Match}=useMatch()
  const {user}=userStore()
const [showSidebar,setShowbar]=useState(false)

useEffect(()=>{
  if(Match.length>0) return;

   user && Matchfound();
  return ()=> removeSocket();
},[Matchfound,removeSocket,user])

useEffect(()=>{
  if(userProfile.length>0) return;

 
  getUserprofile()
},[getUserprofile])

function changeShow(){
  setShowbar(!showSidebar)

}
  return (
    <div className='bg-pink-200 bg-opacity-40 h-screen flex flex-col ' >
    
      <div className='flex-grow   flex overflow-hidden '>
        {/* hader left bar mobile show */}
         <Sidebar  showSidebar={showSidebar}  setShowbar={setShowbar}  />

        {/* header */}
        <div className='flex flex-col  max-w-full md:max-w-[70%] lg:max-w-[75%] w-full  top-0 right-0'>

          <div className='relative z-40'>

          <NavBar setShowbar={changeShow} />
          </div>


             <div className='flex justify-center items-center  flex-grow '>
            <div className=' flex-grow flex h-full justify-center items-center'>
              {!profileLoad && userProfile.length>0 && <SwipeUse/>}
               {!profileLoad && userProfile.length===0 && <Usernotfound/>}
             {profileLoad &&   <Loadding/>} 
            </div>
        </div>
        </div>

     
      </div>
      
   
    </div>
  )
}

export default HomePage



const Usernotfound=()=>{
  return <div className='flex justify-center  flex-col items-center gap-5 '>
    <Frown size={70} className='text-pink-500'/>
    <p className='font-bold text-xl md:text-2xl'>Woop, No user is found!</p>
  </div>
}
const Loadding=()=>{
  return <div className='h-96 w-80 bg-white rounded-md overflow-hidden p-3 shadow-md space-y-3' >
    <div className='h-[80%] w-full bg-gray-300 animate-pulse rounded'></div>
      <div className='w-full bg-gray-300 animate-pulse rounded-full'>&nbsp;</div>
      <div className='w-2/3 bg-gray-300 animate-pulse rounded-full'>&nbsp;</div>
      
  </div>
}