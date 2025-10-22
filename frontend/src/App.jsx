import React, { useEffect } from 'react'
import {Routes,Route, Navigate} from "react-router-dom"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import {Toaster} from "react-hot-toast"
import userStore from './store/user'
import ProfilePage from './pages/ProfilePage'
import ChatPage from './pages/ChatPage'


function App() {
  const {checkauth,CheckAuth,user}=userStore()

  useEffect(()=>{
    CheckAuth()
  },[CheckAuth])

  if(checkauth) return null;


  return (
    <div  id='gridbg' className='absolute top-0 left-0 h-screen w-screen -z-10 overflow-x-hidden' >

    <Routes>
      <Route path='/'  element={user ? <HomePage/> :<Navigate to={'/login'} />}/>
      <Route path='/login'  element={user ? <Navigate to={"/"}/>:<LoginPage/>}/>
      <Route path='/signup'  element={user ? <Navigate to={"/"}/>:<SignupPage/>}/>
      <Route path='/profile'  element={!user ? <Navigate to={"/login"}/>:<ProfilePage/>}/>
      <Route path='/chat/:id'  element={!user ? <Navigate to={"/login"}/>:<ChatPage/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App