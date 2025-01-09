import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import api from '../Services/api';


const Cards: React.FC = () => {
  const [data, setData] = useState({
    totalOrders: 0,
    totalDelivered: 0,
    totalRevenue: '$0',
  });

  useEffect(() => {
    const fetchData = async () => {
     
        const response = await api.get(
          `/Order/${localStorage.getItem('id')}/orders/list?page=1&pageSize=2`
        );
        
        const result = response.data.result[0];
        setData({
          totalOrders: result.totalCount,
          totalDelivered: 250, 
          totalRevenue: '$5000', 
        });
      
    };

    fetchData();
  }, []);

  const cardDetails = [
    { title: 'Total Orders', count: data.totalOrders, icon: '📦' },
    { title: 'Total Delivered', count: data.totalDelivered, icon: '✅' },
    { title: 'Total Revenue', count: data.totalRevenue, icon: '💰' },
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
