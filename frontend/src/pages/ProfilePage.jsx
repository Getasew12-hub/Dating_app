import React, { useEffect, useRef, useState } from 'react'
import userStore from '../store/user'
import { ArrowLeft, X}  from "lucide-react"
import {Link} from "react-router-dom"
import NavBar from '../controller/NavBar';

function ProfilePage() {
  const {user,loadding,UpdateProfile}=userStore();

const imageAccepter=useRef()
  const [imageUpload,setimageupload]=useState(user.img || null)
  const [change,setChange]=useState(false)
  const [inputform,setinputform]=useState({
    name:user.name || '',
    age:user.age|| '',
    gender:user.gender ||'',
    preferece:user.genderPreference || '',
    bio:user.bio || '',
    img:user.img ||  '',
  })
useEffect(()=>{
  console.log("user bio is this",user.bio,"input bio",inputform.bio)
 
  if(user.name.trim()!==inputform.name.trim() || user.age!=inputform.age || user.gender!==inputform.gender ||user.genderPreference!=inputform.preferece || user.bio.trim()!=inputform.bio.trim() || user.img!=inputform.img  ){
    setChange(true)
  }else{
    setChange(false)
  }
},[inputform])

  function Clearimag(){
    setimageupload(null)
    setinputform((pre)=>{
      return {
        ...pre,
        img:'',
      }
    })

    imageAccepter.current.value=null;
  }
function takeImage(e){

  const file=e.target.files[0];
  if(file){
    const reader=new FileReader();
   reader.onload=(e)=>{
       const img=e.target.result;
       setimageupload(img)
       setinputform((pre)=>{
        return{
          ...pre,
          img:img,
        }
       })
   }
    reader.readAsDataURL(file);
  }
}


function formChange(e){
  const {name,value}=e.target;
   
  setinputform((pre)=>{
    return{
      ...pre,
      [name]:value,
    }
  })
}


function formSend(e){
e.preventDefault();

UpdateProfile(inputform)

setChange(false)
}

  return (
    <div className='pt-16'>
   
       <div className='fixed top-0 left-0 w-full z-50 '>  <NavBar inprofile={true}/></div>
       <div className='space-y-4 mb-10'>
        <h1 className='text-center font-bold text-3xl'>Your profile </h1>

        <div className='max-w-96 mx-auto p-3  bg-white shadow-lg '>
          <form onSubmit={formSend} className='space-y-3'>
                <div>
              <label htmlFor="name" >Name</label>
              <input type="text" name="name" id="name" required  className='w-full  border-2 border-gray-400  rounded focus:outline-none focus:border-pink-500  text-sm  p-1.5' value={inputform.name} onChange={formChange}/>
            </div>

                <div>
              <label htmlFor="age" >Age</label>
              <input type="number" name="age" id="age" required min={0}  className='w-full  border-2 border-gray-400  rounded focus:outline-none focus:border-pink-500  text-sm  p-1.5' value={inputform.age} onChange={formChange}/>
            </div>

              <div className='space-y-2'>
              <p >Gender</p>
              <div className='flex gap-7'>
              <div className='space-x-1'>
                <input type="checkbox" name="gender" id="male" value={'male'} className='scale-150 ' checked={inputform.gender=='male'} onChange={formChange}/>
                <label htmlFor="male">Male</label>
              </div>
              <div  className='space-x-1'>
                <input type="checkbox" name="gender" id="female" value={'female'} className='scale-150' checked={inputform.gender=='female'}  onChange={formChange}/>
                <label htmlFor="female">Female</label>
              </div>
              </div>
            </div>



                      <div>
        <h2>Gender prefer </h2>

        <div className='space-y-1'>
          <div className='space-x-1'>
            <input type="radio" name="preferece" id="malegender" defaultChecked={inputform.preferece=='male'} value={"male"}  onChange={formChange} />
            <label htmlFor="malegender">Male</label>
          </div>
          <div className='space-x-1'>
            <input type="radio" name="preferece" id="femalegender"  defaultChecked={inputform.preferece=='female'} value={"female"} onChange={formChange}/>
            <label htmlFor="femalegender">Female</label>
          </div>
          <div className='space-x-1'>
            <input type="radio" name="preferece" id="both" value={"both"} defaultChecked={inputform.preferece=='both'} onChange={formChange}/>
            <label htmlFor="both">Both</label>
          </div>
        </div>
            </div>

            <div>
              <label htmlFor="bio">Bio</label>
              <textarea name="bio" id="bio" className='border-2  border-gray-400 rounded w-full max-h-40 focus:outline-none focus:border-pink-500 p-1' value={inputform.bio} onChange={formChange}></textarea>
            </div>


      {/* image upload*/}

      <div className='space-y-3'>
        <p>Cover image</p>
        <button type='button' className='border-2 border-gray-500 rounded py-1 px-2' onClick={(e)=>
          { e.preventDefault()
            imageAccepter.current.click()}}>Upload image</button>
        <input type="file" name="img" id="img"  className='hidden' ref={imageAccepter} onChange={takeImage}/>
      </div>
{/* image show */}

{imageUpload &&   <div className='max-w-52 relative'>
  <X className='absolute top-0 left-0 bg-black bg-opacity-30 rounded cursor-pointer text-white' onClick={Clearimag}/>
  <img src={imageUpload} alt="user image upload" className='max-w-full rounded' loading='lazy'/>
</div>}
     
      <button disabled={!change} className={`w-full  text-white font-bold py-2 rounded ${!change ? "bg-gradient-to-r from-red-300 to-pink-300 cursor-not-allowed"   :  "bg-gradient-to-r from-red-500 to-pink-500"}`}>{loadding ? "Loadding.." :"Save"}</button>
          </form>
        </div>
       </div>
    </div>
  )
}

export default ProfilePage