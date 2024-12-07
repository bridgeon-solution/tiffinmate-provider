import React from 'react';
import Navbar from '../Atoms/Navbar';
import Cards from '../Components/Cards';
import PieChartCard from '../Components/Peichart';
import Linechart from '../Components/Linechart';
import Feedbacks from '../Components/Feedbacks';

const Dashboards: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Cards/>
      <PieChartCard/>
      <Linechart/>
      {/* <Feedbacks/> */}
    </div>  
  );
};

export default Dashboards;

