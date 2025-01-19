import React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

interface MenuFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  menuformdata: { menu_name: string; description: string; price: number; image: File | null };
  isSubmitting: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
}

const MenuForm: React.FC<MenuFormProps> = ({
  handleSubmit,
  handleInputChange,
  menuformdata,
  isSubmitting,
  handleImageChange,
}) => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom textAlign={"center"}>
        Add Menu Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Menu Name"
          variant="outlined"
          name="menu_name"
          value={menuformdata.menu_name}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          name="description"
          value={menuformdata.description}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          name="price"
          value={menuformdata.price}
          onChange={handleInputChange}
          sx={{ mb: 2 }}
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
          style={{ marginBottom: 16 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
          sx={{ mb: 2 ,backgroundColor:"#e6852c"}}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        
      </form>
    </Box>
  );
};

export default MenuForm;
