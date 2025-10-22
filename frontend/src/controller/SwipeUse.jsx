import React, { useEffect, useRef, useState } from 'react'
import useMatch from '../store/useMatch'
import { Frown } from 'lucide-react'
import toast from 'react-hot-toast'

function SwipeUse() {
  const {userProfile,SwipeLeft,SwipeRight,SwipeDrictionFeadback}=useMatch()
  const drag=useRef()
  
  const secondDrag=useRef()

 const [swipecount,setswipecout]=useState(0)
  const [whichActive,setwhichActive]=useState(drag)
 
  const [countProfile,setcountProfile]=useState(0)
  const [secoundProfile,setsecounProfile]=useState(countProfile+1)

useEffect(()=>{
  
  if(swipecount>=(userProfile.length-1)){
   if(whichActive.current.id=='1'){
    setTimeout(()=>secondDrag.current.style.display='none',500)
   }else{
    setTimeout(()=>drag.current.style.display='none',500)
   }
  }
},[swipecount])

  useEffect(()=>{
    let isdrag=false;
    let isgo=false;
    let dragStatX;
    let dragStatY;
   let mousemoveX;
   let mousemoveY;
   function mousestart(e){
   isdrag=true;
   whichActive.current.style.zIndex='10'
     if(whichActive.current.id=='1'){
      
    secondDrag.current.style.transition='0s'
    secondDrag.current.style.zIndex ='0'
     secondDrag.current.style.transform=`translate(${0}px ,${0}px)`;
      }else{
        drag.current.style.zIndex ='0'
           drag.current.style.transition='0s'
         drag.current.style.transform=`translate(${0}px ,${0}px)`;
         
     
      }
    
    dragStatX=e.clientX;
    dragStatY=e.clientY;
  
   }
  

   function mousemovedetaction(e){
    
   if(!isdrag || isgo) return;
      if(whichActive.current.id=='1' && secoundProfile<(userProfile.length-2)){
     setsecounProfile(countProfile+1)
    
   }else if(countProfile<(userProfile.length-2)){
   setcountProfile(secoundProfile+1)
   }
   
       mousemoveX=e.clientX-dragStatX;
    mousemoveY=e.clientY-dragStatY;


    if(mousemoveX>120){
       
      whichActive.current.id==1 ?  SwipeRight(userProfile[countProfile]) : SwipeRight(userProfile[secoundProfile]) ;
      isgo=true;
      whichActive.current.style.transform=`translate(${100}vw ,${mousemoveY}px)`;
      whichActive.current.style.transition='0.5s'
     
       setswipecout(swipecount+1);
      if(whichActive.current.id=='1'){
     setwhichActive(secondDrag)
     
      }else{
         setwhichActive(drag)
      }
    }else if(mousemoveX<-120){
     
       whichActive.current.id==1 ?  SwipeLeft(userProfile[countProfile]) : SwipeLeft(userProfile[secoundProfile]) ;
       setswipecout(swipecount+1);
       whichActive.current.style.transform=`translate(${-100}vw ,${mousemoveY}px)`;
      whichActive.current.style.transition='0.5s'

             if(whichActive.current.id=='1' ){
     setwhichActive(secondDrag)
     
      }else{
         setwhichActive(drag)
      }
    }  else{

          if(mousemoveY>70 || mousemoveY<-70){
      whichActive.current.style.transition='0.5s'
    
      whichActive.current.style.transform=`translate(${mousemoveX}px ,${mousemoveY>0 ? 50 : -50}px)`;
    }else{
       whichActive.current.style.transition='0s'
      whichActive.current.style.transform=`translate(${mousemoveX}px ,${mousemoveY}px)`;
       

    }


    }
   }


   function mousemovestope(e){
      isdrag=false;
   
  if(mousemoveX<=120  || mousemoveX>=-120 ){
    whichActive.current.style.transition='0.3s'
   
    whichActive.current.style.transform=`translate(${0}px ,${0}px)`;
  }
   }


  whichActive.current.addEventListener('mousedown',mousestart)

  document.addEventListener('mousemove',mousemovedetaction)

document.addEventListener('mouseup',mousemovestope)

return ()=>{
  document.removeEventListener('mouseup',mousemovestope);
  document.removeEventListener('mousemove',mousemovedetaction);
  removeEventListener('mousedown',mousestart)

}
  },[whichActive])

function imageSelect(gender){
  if(gender=='male'){
    return "/male.png"
  }else{
    return "/female.png"
  }
}
  return (
    <div className=' relative   flex justify-center items-center'>
       <div className={`fixed font-bold sm:text-2xl top-20 ${SwipeDrictionFeadback=='Liked!' ? "text-green-500" : "text-red-500"}`}> {SwipeDrictionFeadback }</div>

  <div className='relative h-96 w-72'>
   <div  id='2' className='absolute select-none cursor-grabbing inset-0  bg-white rounded-md shadow-md overflow-hidden '  ref={secondDrag}>
           <div className='w-full py-2 px-10 h-[80%] flex justify-center items-center '>
         <img draggable='false' className='max-h-full max-w-full object-cover select-none h-full rounded-md' src={userProfile[secoundProfile]?.img ||  imageSelect(userProfile[secoundProfile]?.gender)} alt="user profile"  />

       
        </div>
        <div className='px-2'>
         <p>{userProfile[secoundProfile]?.name}</p>
         {userProfile[secoundProfile]?.bio.trim().length>0 &&<p> <span className='text-gray-600'>Bio</span>:{userProfile[countProfile]?.bio.slice(0,28)} {userProfile[countProfile]?.bio.length>28 && ".." } </p>}
        <small><span className='text-gray-600'>Gender</span>:  {userProfile[secoundProfile]?.gender}</small>

        </div>
    </div >

 
     <div id='1' className='h-96 w-72  cursor-grab relative select-none  border-2  bg-white shadow-md rounded-md overflow-hidden  '  ref={drag}>
        <div className='w-full   py-2 px-10 h-[80%] flex justify-center items-center '>
         <img draggable='false' className='max-h-full max-w-full object-cover select-none h-full rounded-md' src={userProfile[countProfile]?.img || imageSelect(userProfile[countProfile].gender)} alt="user profile" />

         
        </div>
        <div className='px-2'>
         <p unselectable='true'>{userProfile[countProfile]?.name}</p>
       {userProfile[countProfile]?.bio.trim().length>0 && <p unselectable='true'> <span className='text-gray-600'>Bio</span>:{userProfile[countProfile]?.bio.slice(0,28)} {userProfile[countProfile]?.bio.length>28 && ".." }</p>}
        <small unselectable='true'><span className='text-gray-600'>Gender</span>:  {userProfile[countProfile]?.gender}</small>

        </div>
      </div>

      { swipecount>=userProfile.length && <Usernotfound/>}

      </div>
    </div>
  )
}

export default SwipeUse



const Usernotfound=()=>{
  return <div className='flex justify-center absolute top-3  flex-col items-center gap-5 '>
    <Frown size={70} className='text-pink-500'/>
    <p className='font-bold text-2xl'>Woop, No user is found!</p>
  </div>
}