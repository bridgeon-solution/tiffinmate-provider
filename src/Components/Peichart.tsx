import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import api from '../Services/api';



const PieCard :React.FC = () => {
  const [order,setOrder]=useState<number>(0);
  const [completedOrder,setCompletedOrder]=useState<number>(0);
    const [ordersData, setOrdersData] = useState([
    { id: 'Completed Orders', value: 0, label: 'Completed', color: '#ffa726' },
    { id: 'Pending Orders', value: 0, label: 'Pending', color: '#ff7043' },
  ]);

  const [revenueData, setRevenueData] = useState([
    { id: 'Revenue Generated', value: 0, label: 'Generated', color: 'green' },
    { id: 'Revenue Pending', value: 0, label: 'Pending', color: '#ff7043' },
  ]);

  const [subscription,setSubscription]=useState<number>(0);
  const [orderSum,setOrderSum]=useState<number>(0);
const [subscriptionSum,setSubscriptionSum]=useState<number>(0);
const [revenue,setRevenue]=useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(
        `/Order/provider/${ localStorage.getItem('id')}?page=1&pageSize=${order}`
      );
      
       const totalOrder=response.data.result[0].totalCount;
       setOrder(totalOrder);
       const data=response.data.result[0].allorders;
       const totalOrderPriceSum=data.reduce((sum: number,order: { total_price: number; })=>sum+order.total_price,0);
     setOrderSum(totalOrderPriceSum);
       const delivered=data.filter((o: { order_status: number; })=>o.order_status===2).length;
  
       setCompletedOrder(delivered);
       setOrdersData([
        { id: 'Completed Orders', value: completedOrder, label: 'Completed', color: '#ffa726' },
        { id: 'Pending Orders', value: totalOrder - delivered, label: 'Pending', color: '#ff7043' },
      ]);

   


      const Subresponse = await api.get(
        `/Subscription/all/${localStorage.getItem('id')}?page=1&pageSize=${subscription}`
        
    );
    const totalCount  = Subresponse.data.result[0].totalCount;
  
    
    setSubscription(totalCount);
    const allSub=Subresponse.data.result[0].allsubscription;
    const totalSubPriceSum = allSub.reduce((sum: number, subscription: { total_price: number }) => sum + subscription.total_price, 0);
  
    setSubscriptionSum(totalSubPriceSum);
    const a=orderSum+subscriptionSum;
    setRevenue(a);
    const completedRevenuePercentage = revenue > 0 ? Math.floor((totalOrderPriceSum / revenue) * 100) : 0;
    const pendingRevenuePercentage = 100 - completedRevenuePercentage;
    
    setRevenueData([
      { id: 'Revenue Generated', value: completedRevenuePercentage, label: 'Generated', color: 'green' },
      { id: 'Revenue Pending', value: pendingRevenuePercentage, label: 'Pending', color: '#ff7043' },
    ]);
    };
   
    fetchData();
 
  }, [order,completedOrder,orderSum,revenue,subscription,subscriptionSum]);
 
  
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center',mt:4 }}>
      <Card sx={{ minWidth: 470,  boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ mb: 2, color: '#e65100' }}>
            Orders Summary
          </Typography>
          <PieChart
            height={200}
            series={[
              {
                data: ordersData.map((item) => ({
                  ...item,
                  label: `${item.label}: ${item.value}%`,
                })),
                innerRadius: 50,
                outerRadius: 100,
              },
            ]}
          />
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 470, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ mb: 2, color: '#e65100' }}>
            Revenue Summary
          </Typography>
          <PieChart
            height={200}
            series={[
              {
                data: revenueData.map((item) => ({
                  ...item,
                  label: `${item.label}: ${item.value}%`,
                })),
                innerRadius: 60,
                outerRadius: 100,
              },
            ]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default PieCard;
