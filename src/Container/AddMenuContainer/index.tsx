import React, { useState, useEffect } from "react";
import { MenuFormData } from "../../Component/AddMenu";
import { AddMenuItem, Getcategory, GetMenu } from "../../Services/AddMenu";
import { Button, SelectChangeEvent } from "@mui/material";
import BasicModal from "../../Atoms/Modal";
import { FormComponent } from "../../Component/AddMenu/index";

interface Category {
  id: string;
  category_name: string;
}

interface types{
  id: string;
  name: string;
}
const AddMenuContainer: React.FC = () => {
  const [formdata, setFormData] = useState<MenuFormData>({
    MenuName: "",
    Description: "",
    Price: 0,
    Image: null,
    type: "",
    Day: "",
    Category: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [providertypes,setprovidertypes]=useState<types []>([]);
  const [days] = useState<string[]>([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await Getcategory();
        setCategories(
          data.map((category: { id: string; category_name: string }) => ({
            id: category.id,
            category_name: category.category_name, 
          }))
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProviderMenu = async () => {
      try {
        const providerId = localStorage.getItem("id");
        if (!providerId) {
          alert("Please login");
          return;
        }
        const data = await GetMenu(providerId); 
        
        setprovidertypes(
          data.map((types: { id: string; name: string }) => ({
            id: types.id,
            name: types.name, 
          }))
        );
       
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
  
    fetchProviderMenu();
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formdata.MenuName) newErrors.MenuName = "Menu Name is required";
    if (!formdata.Category) newErrors.Category = "Category is required";
    if (formdata.Price <= 0 || isNaN(formdata.Price)) newErrors.Price = "Price must be a valid number greater than zero";
    if (!formdata.Day) newErrors.Day = "Day is required";
    return newErrors;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
   
    let newValue = value;
    
   
    if (name === "Price") {
      
      newValue = value === "" ? "" : parseFloat(value).toString();
    }
  
    
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };
  

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      type: value, 
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      Image: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const providerId = localStorage.getItem("id");
      if (!providerId) {
        alert("Please login");
        return;
      }

      const formData = new FormData();
      formData.append("provider_id", providerId);
      formData.append("food_name", formdata.MenuName);
      formData.append("description", formdata.Description);
      formData.append("price", formdata.Price.toString());
      formData.append("day", formdata.Day);
      formData.append("menu_id", formdata.type);
      formData.append("category_id", formdata.Category);
      if (formdata.Image) {
        formData.append("image", formdata.Image);
      }

      console.log([...formData.entries()]); 

      await AddMenuItem(formData);
      alert("Menu saved successfully!");
      setFormData({
        MenuName: "",
        Description: "",
        Price: 0,
        Image: null,
        type: "",
        Day: "",
        Category: "",
      });
      setOpenModal(false);
    } catch (error: any) {
      console.error("Error saving menu:", error);
      alert(error.response?.data?.message || "Failed to save menu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <Button  onClick={handleOpenModal} variant="contained" sx={{ backgroundColor: "#e6852c" ,color:"white" }}>Add Menu</Button>
      {openModal && (
        <BasicModal openModal={openModal} handleClose={handleClose}
        >
          <FormComponent
            formdata={formdata}
            handleInputChange={handleInputChange}
            handleTypeChange={handleTypeChange}
            handleSubmit={handleSubmit}
            handleSelectChange={handleSelectChange}
            handleImageChange={handleImageChange}
            isSubmitting={isSubmitting}
            categories={categories} 
            providertypes={providertypes} 
            days={days}
            errors={errors}
             handleClose={handleClose}
            openModal={openModal}
          />
        </BasicModal>
      )}
    </div>
  );
};

export default AddMenuContainer;
