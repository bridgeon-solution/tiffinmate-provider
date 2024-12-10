import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import Dashboards from '../Pages/Dashboards'
import Orderlist from '../Pages/Orderlist'

function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Dashboard' element={<Dashboards/>} />
        <Route path='/Orderlist' element={<Orderlist/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter