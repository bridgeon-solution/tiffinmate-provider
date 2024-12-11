import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import Details from '../Pages/Details'

function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/details' element={<Details/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter