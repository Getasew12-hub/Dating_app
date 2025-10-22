import React, { useState } from 'react'
import {Link} from "react-router-dom"
import userStore from '../store/user';
const GOOLE_URL="http://localhost:5000/api/authgoogle/google";
function Login() {
  const {loadding,Login}=userStore()

  const [formInput,setFormInput]=useState({
 
    email:'',
    password:'',
 
  })

  function formHandler(e){
const {name,value}=e.target;

setFormInput((pre)=>{
  return{
    ...pre,
    [name]:value,
  }
})
  }

  function FormSend(e){
    e.preventDefault();
    Login(formInput)
  }
  return (
    <div className='min-h-screen w-screen bg-gradient-to-b from-red-400 to-pink-700 flex justify-center items-center '>
      <div className='mt-10   block px-2 w-screen sm:w-auto'>
        <h2 className='text-center font-bold mb-3 sm:text-3xl text-white text-xl'>Sign in to SWipe </h2>
      <a href={GOOLE_URL}>Login with Google</a>
        <div className='sm:w-96 w-full bg-white p-3 rounded mb-10'>
          <form className='sm:space-y-5 space-y-3' onSubmit={FormSend}>
       

            <div>
              <label htmlFor="email" className='sm:text-lg text-sm'>Email address</label>
              <input type="email" name="email" id="email" required  className='w-full  border-2 border-gray-400 p-2 rounded focus:outline-none focus:border-pink-500 text-md '  value={formInput.email} onChange={formHandler} />
            </div>
            <div>
              <label htmlFor="password" className='sm:text-lg text-sm'>Password</label>
              <input type="password" name="password" id="password" required  className='w-full  border-2 border-gray-400 p-2 rounded focus:outline-none focus:border-pink-500 text-md' value={formInput.password} onChange={formHandler} />
            </div>
       

         




            <button className='w-full bg-gradient-to-r from-red-500 to-pink-600 py-2 rounded text-white font-bold  shadow-lg  shadow-gray-500'>{loadding ? "Loadding.." :"Login"}</button>

            <div className='text-center'>
           <p>I don't have an account?</p>
            <Link to={"/signup"} className='text-pink-500'>Create new a account </Link>

            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login