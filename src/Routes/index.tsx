import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react';
import MenuForm from '../Component/AddMenu';
import AddmenuPage from '../Pages/AddMenupage';
import MenuDisplayContainer from '../Container/displayFooditem';
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
        <Route
          path="/*"
          element={
                <Navbar>
                <Routes>
                <Route path='/Dashboard' element={<Dashboards/>} />
                <Route path='/addmenu' element={<AddmenuPage/>} />
                <Route path='/displayfoods' element={<MenuDisplayContainer/>} />
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