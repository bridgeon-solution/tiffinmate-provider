import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react';
import Addmenu from '../Pages/AddMenu';
import ProfileCard from '../Component/ProfileComponent';
import ForgotMail from '../Pages/ForgotMail';
import Verify from '../Pages/Verify';
import ResetingPassword from '../Pages/ResetingPassword';
import EditProfile from '../Pages/EditProfile';
import ProviderReview from '../Pages/ProviderReview';
const Signup = React.lazy(() => import('../Pages/Signup'));
const Login=React.lazy(()=>import('../Pages/Login'));
const Dashboards=React.lazy(()=>import('../Pages/Dashboards'));
const Details=React.lazy(()=>import('../Pages/Details'));
const Navbar = React.lazy(() => import('../Atoms/Navbar'));


function AppRouter() {
  return (
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
    <Route path="/" element={<Signup />} />
    <Route path='/login' element={<Login/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/mail' element={<ForgotMail/>}/>
        <Route path='/verification' element={<Verify/>}/>
        <Route path='/resetpassword' element={<ResetingPassword/>}/>
        <Route
          path="/*"
          element={
                <Navbar>
                <Routes>
                <Route path='/Dashboard' element={<Dashboards/>} />
                <Route path='/addmenu' element={<Addmenu/>} />
                <Route path='/Reviews' element={<ProviderReview/>}/>
                <Route path='/profile' element={<ProfileCard/>}/>
                <Route path='/edit' element={<EditProfile/>}/>
                </Routes>
                </Navbar>
          }
        />
      </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRouter