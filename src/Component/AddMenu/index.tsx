
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
 
  
} from "@mui/material";

import { SelectChangeEvent } from "@mui/material";

export interface MenuFormData {
  MenuName: string;
  Description: string;
  Price: number;
  Image: File | null;
  type: string;
  Day: string;
  Category: string;
}



interface FormProps {
  formdata: MenuFormData;
  providertypes:{ id: string; name: string }[];  
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleTypeChange: (e: SelectChangeEvent<string>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSelectChange: (e: SelectChangeEvent<string>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  categories: { id: string; category_name: string }[]; 
  days: string[]; 
  errors: { [key: string]: string };
  handleClose: () => void;
  openModal: boolean;
}

export const FormComponent: React.FC<FormProps> = ({
  formdata,
  handleInputChange,
  handleTypeChange,
  handleSubmit,
  handleSelectChange,
  handleImageChange,
  isSubmitting,
  categories,
  providertypes,
  days,
  errors,

}) => {
  return (
    <form onSubmit={handleSubmit} >

      <div style={{ marginBottom: "16px" }}>
        <TextField
          label="Menu Name"
          name="MenuName"
          value={formdata.MenuName}
          onChange={handleInputChange}
          error={!!errors.MenuName}
          helperText={errors.MenuName}
          fullWidth
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <TextField
          label="Description"
          name="Description"
          value={formdata.Description}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <TextField
          label="Price"
          name="Price"
          type="text"
          value={formdata.Price}
          onChange={handleInputChange}
          error={!!errors.Price}
          helperText={errors.Price}
          fullWidth
        />
      </div>
      <div style={{ marginBottom: "16px" }}>
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            name="Category"
            value={formdata.Category}
            onChange={handleSelectChange}
            error={!!errors.Category}
          >
          {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.category_name} 
              </MenuItem>
            ))} 
           
          </Select>
        </FormControl>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <FormControl fullWidth>
          <InputLabel id="day-label">Day</InputLabel>
          <Select
            name="Day"
            value={formdata.Day}
            onChange={handleSelectChange}
            error={!!errors.Day}
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ marginBottom: "16px" }}>
      
  
      <FormControl fullWidth>
  <InputLabel id="type-label">Type</InputLabel>
  <Select
    value={formdata.type}
    onChange={handleTypeChange}
    name="type"
    labelId="type-label" 
    error={!!errors.type} 
  >
    {providertypes.map((type) => (
      <MenuItem key={type.id} value={type.id}> 
        {type.name} 
      </MenuItem>
    ))}
  </Select>
</FormControl>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <Button variant="contained" component="label" fullWidth sx={{ backgroundColor: "#e6852c" }}>
          Upload Image
          <input
            type="file"
            hidden
            name="image"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#e6852c" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
};
