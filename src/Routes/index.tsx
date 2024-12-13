import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react';
const Signup = React.lazy(() => import('../Pages/Signup'));
const Login=React.lazy(()=>import('../Pages/Login'));
const Dashboards=React.lazy(()=>import('../Pages/Dashboards'));
const Orderlist=React.lazy(()=>import('../Pages/Orderlist'));
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
        <Route
          path="/*"
          element={
                <Navbar>
                <Routes>
                <Route path='/Dashboard' element={<Dashboards/>} />
                <Route path='/Orderlist' element={<Orderlist/>} />
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