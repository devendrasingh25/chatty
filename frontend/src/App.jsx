import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import SignUpPage from "./pages/SignUpPage"
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
    const {authUser,checkAuth , isCheckingAuth} = useAuthStore()
     const {theme} = useThemeStore()
    useEffect(() => {
      checkAuth()
    },[checkAuth]);

    console.log({authUser})

    if (isCheckingAuth && !authUser) return(
      <div className=' flex items-center justify-center h-screen'>
        < Loader  className=" size-10 animate-spin"/>
      </div>
    )
  return (
    <div data-theme ={theme}>
      
      <Navbar/>

      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to ="/login"/>}/>
        <Route path='/signup' element={!authUser ? <SignUpPage/> :<Navigate to ="/"/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/>: <Navigate to ="/"/>}/>
        <Route path='/logout' element={ <LogoutPage/>}/>
        <Route path='/settings' element={ <SettingsPage/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to ="/login"/>}/>
      </Routes>
       <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />

    </div>
  )
}

export default App
