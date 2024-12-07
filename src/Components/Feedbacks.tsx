import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Rating } from '@mui/material'; 

const Feedbacks: React.FC = () => {
  const cardDetails = [
    {
      username: 'rinsha',
      profileImage: 'assets/feedback1.png', 
      feedback: 'qwertyuiopsdfghjkldxcfvbnmdrtfgyhujkl',
      foodImage: 'assets/feedback1.png', 
      rating: 4, 
    },
    
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 4,
        flexWrap: 'wrap',
        mt: 4,
      }}
    >
      {cardDetails.map((card, index) => (
        <Card key={index} sx={{ width: 350, display: 'flex', boxShadow: 3 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            {/* Left side of the card */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, textAlign: 'center' }}>
              <Avatar sx={{ margin: '0 auto', bgcolor: '#f5a561', width: 60, height: 60 }} src={card.profileImage} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                {card.username}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {card.feedback}
              </Typography>
              <Rating name="user-rating" value={card.rating} readOnly precision={0.5} />
            </Box>

           
            <Box sx={{ flexShrink: 0 }}>
              <img
                src={card.foodImage}
                alt="Food"
                style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 8 }}
              />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Feedbacks;


