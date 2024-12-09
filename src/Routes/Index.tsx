import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboards from '../Pages/Dashboards';
import Navbar from '../Atoms/Navbar';
import Orderlist from '../Pages/Orderlist';


const Index: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Dashboards />} /> */}
        <Route path='/*'
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
  );
};

export default Index;
