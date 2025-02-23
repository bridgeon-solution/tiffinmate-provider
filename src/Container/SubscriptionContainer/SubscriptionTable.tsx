import React, { useState } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";

interface FoodItem {
  food_name: string;
  price: number;
  description: string;
  day: string;
  image: string;
}

interface Category {
  category_name: string;
  food_Items: FoodItem[];
}

interface Subscription {
  user_name: string;
  address: string | null;
  city: string | null;
  ph_no: string;
  category: Category[];
  menu_name: string;
  total_price: number;
  start_date: string;
  is_active: boolean;
}

interface TableProps {
  data: Subscription[];
  loading: boolean;
}

const SubscriptionTable: React.FC<TableProps> = ({ data, loading }) => {
  const [open, setOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleOpenModal = (categories: Category[]) => {
    setSelectedCategories(categories);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedCategories([]);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: "500px", overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Menu</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.user_name}</TableCell>
                  <TableCell>{item.address || "N/A"}</TableCell>
                  <TableCell>{item.city || "N/A"}</TableCell>
                  <TableCell>{item.ph_no}</TableCell>
                  <TableCell>{item.menu_name}</TableCell>
                  <TableCell>{item.total_price}</TableCell>
                  <TableCell>{item.start_date?.slice(0, 10)}</TableCell>
                  <TableCell style={{ color: item.is_active ? "blue" : "red" }}>
                    {item.is_active ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenModal(item.category)} color="primary">
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleCloseModal} aria-labelledby="food-modal-title">
        <Box
          sx={{
            p: 3,
            bgcolor: "white",
            width: "60%",
            maxHeight: "80vh",
            overflowY: "auto",
            margin: "auto",
            mt: 5,
            borderRadius: 2,
          }}
        >
          <Typography id="food-modal-title" variant="h6" gutterBottom>
            Food Items 
          </Typography>
          {selectedCategories.length > 0 ? (
            selectedCategories.map((category, idx) => (
              <Box key={idx} mb={3}>
                <Typography variant="h6" color="primary">
                  {category.category_name}
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: "400px", overflowY: "auto" }}>
                  <Table>
                  <TableHead sx={{ bgcolor: "lightgray" }}>
  <TableRow>
    <TableCell sx={{ fontWeight: "bold", textAlign: "center", p: 2 }}>Day</TableCell>
    <TableCell sx={{ fontWeight: "bold", textAlign: "center", p: 2 }}>Food Name</TableCell>
    <TableCell sx={{ fontWeight: "bold", textAlign: "center", p: 2 }}>Price</TableCell>
    <TableCell sx={{ fontWeight: "bold", textAlign: "center", p: 2 }}>Description</TableCell>
<TableCell sx={{ fontWeight: "bold", textAlign: "center", p: 2 }}>Image</TableCell>
  </TableRow>
</TableHead>

                    <TableBody>
                      {category.food_Items.map((food, foodIdx) => (
                        <TableRow key={foodIdx}>
                          <TableCell>{food.day}</TableCell>
                          <TableCell>{food.food_name}</TableCell>
                          <TableCell>${food.price}</TableCell>
                          <TableCell>{food.description}</TableCell>
<TableCell>
                            <img src={food.image} alt={food.food_name} width="50" height="50" style={{ borderRadius: "5px" }} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))
          ) : (
            <Typography>No Food Items Available</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default SubscriptionTable;
