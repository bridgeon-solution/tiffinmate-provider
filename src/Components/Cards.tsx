
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import api from '../Services/api';



const Cards: React.FC = () => {
const [order,setOrder]=useState<number>(0);
const [subscription,setSubscription]=useState<number>(0);
const [orderSum,setOrderSum]=useState<number>(0);
const [subscriptionSum,setSubscriptionSum]=useState<number>(0);
const [revenue,setRevenue]=useState<number>(0);
const [delivered,setDelivered]=useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(
        `/Order/provider/${ localStorage.getItem('id')}?page=1&pageSize=${order}`
      );
       const totalOrder=response.data.result[0].totalCount;
     
      setOrder(totalOrder);
      const orders=response.data.result[0].allorders;
      const totalOrderPriceSum=orders.reduce((sum: number,order: { total_price: number; })=>sum+order.total_price,0);
     setOrderSum(totalOrderPriceSum);
     const delivered=orders.filter((o: { order_status: number; })=>o.order_status===2).length
    
     setDelivered(delivered);

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

    };
   
    fetchData();
  }, [order,orderSum,subscription,subscriptionSum]);

  const cardDetails = [
    { title: 'Total Orders', count: order, icon: '📦' },
    { title: 'Total Delivered', count: delivered, icon: '✅' },
    { title: 'Total Revenue', count: revenue, icon: '💰' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 4,
        flexWrap: 'wrap',
        m:0,
      }}
    >
      {cardDetails.map((card, index) => (
        <Card key={index} sx={{ width: 300, boxShadow: 3 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Avatar sx={{ margin: '0 auto', bgcolor: '#f5a561', fontSize: 24 }}>
              {card.icon}
            </Avatar>
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
              {card.count}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {card.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Cards;
