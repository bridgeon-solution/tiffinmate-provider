import React from 'react';
import { CircularProgress, Box, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

interface Menu {
  id: string;
  name: string;
  image: File | string | null;
  description: string;
  monthly_plan_amount: number;
}

interface DisplaymenuProps {
  menuList: Menu[];
  loading: boolean;
  error: string | null;
  addfooditem: (menuId: string) => void;
}

const Displaymenu: React.FC<DisplaymenuProps> = ({ menuList, loading, error, addfooditem }) => {

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
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {menuList.length === 0 && !loading  ? (
          <Typography variant="body1">No menus available.</Typography>
        ) : (
          menuList.map((menu) => (
            <Grid item key={menu.id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                sx={{
                  borderRadius: 4,
                  textAlign: 'center',
                  height: 400,
                  width:300,
                  display: 'flex',
                  flexDirection: 'column',
                  margin: 'auto',
                  overflow:'hidden',
                }}
              >
                {menu.image && (
                  <CardMedia
                    component="img"
                    height="150"
                    image={typeof menu.image === 'string' ? menu.image : URL.createObjectURL(menu.image)}
                    alt={menu.name}
                    sx={{
                      borderRadius: '50%',
                      width: 120,
                      height: 120,
                      margin: 'auto',
                      mt: 2,
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '1rem', height: 50 }}>
                    {menu.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      height: 60,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      'WebkitLineClamp': 3,
                      'WebkitBoxOrient': 'vertical',
                      mb: 2,
                    }}
                  >
                    {menu.description}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      mb: 2,
                    }}
                  >
                    ₹{menu.monthly_plan_amount}
                  </Typography>

                  <Box
                    
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="#e6852c"
                      fontWeight="bold"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                      onClick={() => addfooditem(menu.id)} 
                    >
                      Add Food
                    </Typography>
                    <Link
                      to={`/menu/${menu.id}`}
                      style={{
                        fontWeight: 'bold',
                        color: '#e6852c',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        marginTop: '8px',
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { textDecoration: 'underline' },
                          fontWeight: 'bold',
                        }}
                      >
                        View
                      </Typography>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Displaymenu;




