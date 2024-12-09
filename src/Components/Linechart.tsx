
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LineChart } from '@mui/x-charts/LineChart';

const ordersData = [4000, 3000, 2000, 2780, 1890, 2390, 3490]; 
const revenueData = [2400, 1398, 9800, 3908, 4800, 3800, 4300]; 
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']; 

export default function OrdersAndRevenueComparison() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <Card sx={{ minWidth: 600, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ mb: 2, color: '#e65100' }}>
            Orders vs Revenue (Monthly)
          </Typography>
          <LineChart
            width={500}
            height={300}
            series={[
              {
                data: ordersData, 
                label: 'Orders',
                color: '#ffa726', 
              },
              {
                data: revenueData, 
                label: 'Revenue',
                color: 'red', 
              },
            ]}
            xAxis={[{ scaleType: 'point', data: months }]} 
          />
        </CardContent>
      </Card>
    </Box>
  );
}
