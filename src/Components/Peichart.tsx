import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';

const ordersData = [
  { id: 'Completed Orders', value: 70, label: 'Completed', color: '#ffa726' },
  { id: 'Pending Orders', value: 30, label: 'Pending', color: '#ff7043' },
];

const revenueData = [
  { id: 'Revenue Generated', value: 80, label: 'Generated', color: 'green' },
  { id: 'Revenue Pending', value: 20, label: 'Pending', color: '#ff7043' },
];

const PieCard :React.FC = () => {
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
