import { Heart, Loader, MessageCircle, X } from 'lucide-react'
import React, { use, useRef, useState } from 'react'
import useMatch from '../store/useMatch';
import {Link} from "react-router-dom"
import { useEffect } from 'react';

import userStore from '../store/user';

function Sidebar({showSidebar,setShowbar}) {



 const {onlineUsers}=userStore()
    const {Match,loadding,getMatchs}=useMatch()

useEffect(()=>{
  if(Match.length>0) return;
 
    getMatchs()
},[getMatchs])

  return (
    <div className='flex-grow overflow-hidden relative z-50 '>

          {showSidebar && <div className='fixed top-0 bottom-0 left-0 right-0  md:hidden z-[500]' onClick={()=>setShowbar(false)}></div>}

                <div className={`bg-white ${  showSidebar ? 'translate-x-0' : "-translate-x-full" }   fixed md:static inset-y-0 max-w-64 w-full z-[1000]  shadow-md shadow-gray-400 h-screen transition-transform duration-500 ease-in-out   md:translate-x-0 md:max-w-full felx flex-col ` }>

                   <div className='font-bold text-2xl text-pink-500 p-2.5 border-b-2 border-gray-300'>
                    <h1>Matchers</h1>
                   </div>
                    <X  className='absolute top-0 right-0 cursor-pointer md:hidden' onClick={()=>setShowbar(false)}/>
                   {/* matchers */}

                   
              <div className='space-y-4 px-2 pt-3 pb-20 flex flex-col flex-grow h-full  overflow-y-auto hiddenscroll' >
                  {loadding? 
                  <div className=' w-full flex flex-col gap-5 justify-center items-center h-[80%] '>
                    <Loader size={35} className='text-red-500 animate-spin '/>
                    <p className='font-semibold text-xl'>Loading matchers</p>
                  </div>
                  
                  : Match.length==0 ? <div className='flex-grow  flex flex-col gap-4 justify-center items-center '>
                    <Heart size={45} className='text-red-500'/>
                <p className='font-bold text-xl'>No Matchs yet</p>
                  </div>:
                   Match?.map((val,index)=>
                <Link to={`/chat/${val._id}`} key={index}>  <div className='flex justify-between items-center relative cursor-pointer hover:bg-gray-300'>
                    {onlineUsers.includes(val._id) && <div className='absolute top-0 h-3 w-3 rounded-full left-0 bg-green-500'></div>}
                     <div className='flex justify-center items-center gap-1 '>
                      <div className='flex justify-center items-center h-10 w-10 bg-gray-300 rounded-full text-white overflow-hidden border-2 border-white '>
                      {val?.img ?  <img src={val.img} alt="user profile" className='h-full w-full object-cover' />:
                      <p >{val?.name?.charAt(0).toUpperCase()}</p>
                      }</div>
        
                      <p>{val.name}</p>
                      </div>

                      <div className={`text-sm ${val?.isMatch=='match' ? 'text-green-400' : 'text-yellow-500'}`}>{val?.isMatch=='match' ? "Match" : 'Liked'}</div>
                    </div></Link>  
                  )}
                  </div>
        
                 
                </div>
        
      
           
        
    </div>
  )
}

export default Sidebar