
import React from "react";
import { Button, TextField, Box, Typography, MenuItem, Select, InputLabel, FormControl, Grid, SelectChangeEvent } from "@mui/material";

interface DayMenu {
  day: string;
  MenuName: string;
  Price: number;
  Image: File | null;
  Category: string; 
  Description: string;
}

interface FoodItemFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleCategoryChange: (e: SelectChangeEvent<string>, index: number) => void;
  foodformdata: DayMenu[];
  isSubmitting: boolean;
  handleClose: () => void;
  selectedMenuId: string | null;
  
}

export const FoodItemForm: React.FC<FoodItemFormProps> = ({
  handleSubmit,
  handleInputChange,
  foodformdata,
  isSubmitting,
  handleImageChange,
  handleCategoryChange,
  
}) => {
  const categories = [
    { id: "019519b1-4f76-7623-8b8f-56b49517c05d", category_name: "Breakfast" },
    { id: "019519b2-2460-7451-9304-a6f261ebd022", category_name: "Lunch" },
    { id: "019519b0-cd5b-75a6-bb9e-54515feff582", category_name: "Dinner" },
  ];
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom align="center" color="#e6852c">
        Add Food Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ overflowX: "auto", padding: 2, maxHeight: "70vh", position: "relative" }}>
          <Grid container spacing={2} sx={{ minWidth: "1000px", padding: 0 }}>   
            <Grid container item xs={12} spacing={2} sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
              <Grid item xs={1}><Typography variant="body1" fontWeight="bold">Day</Typography></Grid>
              <Grid item xs={2}><Typography variant="body1" fontWeight="bold">Food Name</Typography></Grid>
              <Grid item xs={2}><Typography variant="body1" fontWeight="bold">Description</Typography></Grid>
              <Grid item xs={1}><Typography variant="body1" fontWeight="bold">Price</Typography></Grid>
              <Grid item xs={2}><Typography variant="body1" fontWeight="bold">Category</Typography></Grid>
              <Grid item xs={2}><Typography variant="body1" fontWeight="bold">Image</Typography></Grid>
            </Grid>

            {foodformdata.map((item, index) => (
              <Grid container item xs={12} spacing={2} key={index} sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <Grid item xs={1}>
                  <Typography variant="body2">{daysOfWeek[index]}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Food Name"
                    variant="outlined"
                    name="MenuName"
                    value={item.MenuName}
                    onChange={(e) => handleInputChange(e, index)}
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    name="Description"
                    value={item.Description}
                    onChange={(e) => handleInputChange(e, index)}
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <TextField
                    fullWidth
                    label="Price"
                    type="number"
                    variant="outlined"
                    name="Price"
                    value={item.Price}
                    onChange={(e) => handleInputChange(e, index)}
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={item.Category} 
                      onChange={(e) => handleCategoryChange(e, index)} 
                      name="Category"
                      label="Category"
                    >
                      {categories.map((category, idx) => (
                        <MenuItem key={idx} value={category.id}>{category.category_name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <input
                    type="file"
                    accept="image/*"
                    name="Image"
                    onChange={(e) => handleImageChange(e, index)}
                    style={{ marginBottom: 16 }}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>

          <style>
            {`
              .MuiBox-root::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{ flex: 1, marginRight: 1, backgroundColor: "#e6852c" }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FoodItemForm;

