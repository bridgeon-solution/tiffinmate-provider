import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const Cards: React.FC = () => {
  const cardDetails = [
    { title: 'Total Orders', count: 300, icon: '📦' },
    { title: 'Total Delivered', count: 250, icon: '✅' },
    { title: 'Total Revenue', count: '$5000', icon: '💰' },
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
