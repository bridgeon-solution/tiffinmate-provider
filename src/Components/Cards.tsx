
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';



const Cards: React.FC = () => {


  // useEffect(() => {
  //   const fetchData = async () => {
     
  //     try{
  //       const response = await api.get(
  //         `/Order/${localStorage.getItem('id')}/orders/list?page=1&pageSize=2`
  //       );
        
  //       if(response?.data?.result && response?.data?.result?.length>0){
  //         const result = response.data.result[0];
  //         setData({
  //           totalOrders: result.totalCount,
  //           totalDelivered: 250, 
  //           totalRevenue: '$5000', 
  //         });
  //       }else{
  //         throw Error("No data found in the result array.");
  //       }
       
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     }catch(err:any){
  //       throw Error(err);
  //     }
      
  //   };

  //   fetchData();
  // }, []);

  const cardDetails = [
    { title: 'Total Orders', count: 60, icon: '📦' },
    { title: 'Total Delivered', count: 55, icon: '✅' },
    { title: 'Total Revenue', count: 90, icon: '💰' },
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
