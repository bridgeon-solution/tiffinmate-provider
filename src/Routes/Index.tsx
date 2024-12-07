import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboards from '../Pages/Dashboards';
import Peichart from '../Components/Peichart';

const Index: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboards />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
