import React, { useState } from 'react'
import {Link} from "react-router-dom"
import userStore from '../store/user'

function SignupPage() {
  const {loadding,Signup}=userStore()

  const [gender,setgender]=useState('male')
  const [formInput,setFormInput]=useState({
    name:'',
    email:'',
    password:'',
    age:'',
    gender:'male',
    preferece:'male',
  })

  function formHandler(e){
const {name,value}=e.target;
if(name=="gender"){
  setgender(value)
}
setFormInput((pre)=>{
  return{
    ...pre,
    [name]:value.trimStart(),
  }
})
  }

  function FormSend(e){
    e.preventDefault();

   Signup(formInput)
  }
  return (
    <div className='min-h-screen w-screen bg-gradient-to-b from-red-400 to-pink-700 flex justify-center items-center '>
      <div className='mt-10 w-screen sm:w-auto px-2'>
        <h2 className='text-center font-bold mb-3 text-xl text-white sm:text-3xl'>Create an Swipe account</h2>

        <div className='sm:w-96 w-full bg-white p-3 rounded mb-10'>
          <form className='sm:space-y-5 space-y-2' onSubmit={FormSend}>
            <div>
              <label htmlFor="name" className='sm:text-lg  text-sm'>Name</label>
              <input type="text" name="name" id="name" required  className='w-full  border-2 border-gray-400  rounded focus:outline-none focus:border-pink-500 sm:text-lg text-sm sm:p-2 p-1.5' value={formInput.name} onChange={formHandler} />
            </div>

            <div>
              <label htmlFor="email" className='sm:text-lg text-sm'>Email address</label>
              <input type="email" name="email" id="email" required  className='w-full  border-2 border-gray-400 rounded focus:outline-none focus:border-pink-500 sm:text-lg text-sm sm:p-2 p-1.5'  value={formInput.email} onChange={formHandler} />
            </div>
            <div>
              <label htmlFor="password" className='sm:text-lg text-sm'>Password</label>
              <input type="password" name="password" id="password" required  className='w-full  border-2 border-gray-400  rounded focus:outline-none focus:border-pink-500 sm:text-lg text-sm sm:p-2 p-1.5' value={formInput.password} onChange={formHandler} />
            </div>
            <div>
              <label htmlFor="age" className='sm:text-lg text-sm'>Age</label>
              <input type="number" name="age" id="age" required min={0}  className='w-full  border-2 border-gray-400  rounded focus:outline-none focus:border-pink-500 sm:text-lg text-sm sm:p-2 p-1.5' value={formInput.age} onChange={formHandler} />
            </div>

            {/* gender */}

            <div className='space-y-2'>
              <p >Your gender</p>
              <div className='flex gap-7'>
              <div className='space-x-1'>
                <input type="checkbox" name="gender" id="male" value={'male'} className='scale-150 ' checked={gender=='male'}  onChange={formHandler}/>
                <label htmlFor="male">Male</label>
              </div>
              <div  className='space-x-1'>
                <input type="checkbox" name="gender" id="female" value={'female'} className='scale-150'  onChange={formHandler} checked={gender=='female'} />
                <label htmlFor="female">Female</label>
              </div>
              </div>
            </div>

            {/* prefer */}

            <div>
        <h2>Prefer me</h2>

        <div className='space-y-1'>
          <div className='space-x-1'>
            <input type="radio" name="preferece" id="malegender" defaultChecked value={"male"}  onChange={formHandler} />
            <label htmlFor="malegender">Male</label>
          </div>
          <div className='space-x-1'>
            <input type="radio" name="preferece" id="femalegender"  value={"female"}  onChange={formHandler}/>
            <label htmlFor="femalegender">Female</label>
          </div>
          <div className='space-x-1'>
            <input type="radio" name="preferece" id="both" value={"both"}   onChange={formHandler}/>
            <label htmlFor="both">Both</label>
          </div>
        </div>
            </div>


            <button className='w-full bg-gradient-to-r from-red-500 to-pink-600 py-2 rounded text-white font-bold shadow-lg  shadow-gray-500'>{loadding ? "Loadding.." :"Sing up"}</button>

            <div className='text-center'>
           <p>I already have an accont?</p>
            <Link to={"/login"} className='text-pink-500'>Longin in your account</Link>

            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default SignupPage