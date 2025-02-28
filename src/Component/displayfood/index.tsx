import React from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, CircularProgress, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

interface FoodItem {
  id:string;
  category_id: string;
  provider_id: string;
  menu_id: string;
  food_name: string;
  price: number;
  description: string;
  day: string;
  image?: string;
}

interface Menu {
  id: string;
  category_name: string;
  created_at: string;
  updated_at: string;
  food_items: FoodItem[] | null;
}

interface MenuDisplayProps {
  menuList: Menu[];
  foodItems: FoodItem[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => void;
 
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({ menuList, foodItems, loading, error,onDelete }) => {
  

  const { menuid} = useParams();
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {menuList.length === 0 && <Typography variant="body1">No categories available</Typography>}

      {[...menuList]
       .sort((a, b) => {
       const order = ["Breakfast", "Lunch", "Dinner"];
       return order.indexOf(a.category_name) - order.indexOf(b.category_name);
  })
  .map((menu) => {
        const filteredFoodItems = foodItems.filter((item) => item.menu_id === menuid && item.category_id === menu.id);

        return (
          <Box key={menu.id} sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {menu.category_name}
            </Typography>
            <Box
              sx={{
                overflowX: 'auto',
                display: 'flex',
                flexWrap: 'nowrap',
                paddingBottom: 2,
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              {filteredFoodItems.length === 0 ? (
                <Typography variant="body1">No food items available for this category.</Typography>
              ) : (
                filteredFoodItems.map((food) => (
                  <Box key={food.food_name} sx={{ minWidth: 250, marginRight: 2 }}>
                    <Card sx={{position: "relative", display: 'flex', flexDirection: 'column', padding: 1, borderRadius: 2, height: 250, width: '100%', boxShadow: 4 }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={food.image || '/placeholder.jpg'}
                        alt={food.food_name}
                        sx={{
                          borderRadius: 2,
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': { transform: 'scale(1.05)' },
                          height: 140,
                          objectFit: 'cover',
                          width: '100%',
                        }}
                      />
                      <CardContent sx={{ height: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            fontSize: '0.85rem',
                            color: 'primary.main',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {food.day}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {food.food_name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            mt: 1,
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            marginTop: 0,
                            color: 'black',
                          }}
                        >
                          ₹{food.price}
                        </Typography>
                        <IconButton
    onClick={() => onDelete(food.id)}
    sx={{
      position: "absolute",
      top: 8,
      right: 8,
      color: "red",
    }}
  >
    <DeleteIcon />
  </IconButton>
                      </CardContent>
                    </Card>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        );
      })}
    </Container>
  );
};

export default MenuDisplay;
