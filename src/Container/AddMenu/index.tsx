import React, { useState, useEffect } from "react";
import {  PostMenu } from "../../Services/AddMenu";
import { Button, Card, CardContent, Typography, } from "@mui/material";
import BasicModal from "../../Atoms/Modal";
import MenuForm from "../../Component/AddMenu";
import { toast } from "react-toastify";

interface MenuFormProps {
  menu_name: string;
  description: string;
  price: number;
  image: File | null;
}

const AddMenuContainer: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuFormProps>({
    menu_name: "",
    description: "",
    price: 0,
    image: null,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const AddProviderMenu = async () => {
      try {
        const providerId = localStorage.getItem("id");
        if (!providerId) {
          toast.warning("Please login");
          return;
        }
      } catch (error) {
        throw error;
      }
    };

    AddProviderMenu();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMenuData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setMenuData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const providerId = localStorage.getItem("id");
      if (!providerId) {
        toast.warning("Please login");
        return;
      }

      const formData = new FormData();
      formData.append("provider_id", providerId);
      formData.append("name", menuData.menu_name);
      formData.append("description", menuData.description);
      formData.append("price", menuData.price.toString());
      if (menuData.image) {
        formData.append("image", menuData.image);
      }

      await PostMenu(formData);
      toast.success("Menu saved successfully!");
      setMenuData({
        menu_name: "",
        description: "",
        price: 0,
        image: null,
      });
      setOpenModal(false);
    } catch (error: any) {
      
      toast.error(error.response?.data?.message || "Failed to save menu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
      <Card sx={{width:400,p:2,textAlign: "center" ,margin:10,height:200}}>
        <CardContent>
          <Typography>Add menu</Typography>
        </CardContent>
        <CardContent>
        <Button onClick={handleOpenModal} variant="contained" sx={{ backgroundColor: "#e6852c", color: "white",borderRadius:80 }}>+</Button> 
        </CardContent>
      </Card>
      
      {openModal && (
         <BasicModal openModal={openModal} handleClose={handleClose}>
          <MenuForm
            menuformdata={menuData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            isSubmitting={isSubmitting}
            handleClose={handleClose}
            
          />
        </BasicModal>
      )}
    </div>
  );
};

export default AddMenuContainer;

