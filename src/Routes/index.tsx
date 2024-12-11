import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import Dashboards from '../Pages/Dashboards'
import Orderlist from '../Pages/Orderlist'
import Details from '../Pages/Details'
import Navbar from '../Atoms/Navbar'

function AppRouter() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

export default AppRouter