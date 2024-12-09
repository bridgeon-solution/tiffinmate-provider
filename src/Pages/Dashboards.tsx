import React from 'react';
import Cards from '../Components/Cards';
import PieChartCard from '../Components/Peichart';
import Linechart from '../Components/Linechart';


const Dashboards: React.FC = () => {
  return (
    <div>
      <Cards/>
      <PieChartCard/>
      <Linechart/>
    </div>  
  );
};

export default Dashboards;

