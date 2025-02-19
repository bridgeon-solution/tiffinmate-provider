import React, { useEffect, useState } from "react";
import { AddMenuItem, GetMenu  } from "../../Services/AddMenu/index";
import Displaymenu from "../../Component/DisplayMenu";
import FoodItemForm from "../../Component/AddFoodItem";
import { SelectChangeEvent } from "@mui/material";
import BasicModal from "../../Atoms/Modal";
import { toast } from "react-toastify";
import AddMenuContainer from "../AddMenu";

interface Menu {
  id: string;
  name: string;
  image: File | null;
  description: string;
  monthly_plan_amount: number;
}

interface DayMenu {
  day: string;
  MenuName: string;
  Price: number;
  Image: File | null;
  Category: string;
  Description: string;
}


const DisplayMenu: React.FC = () => {
  const [MenuList, setMenuList] = useState<Menu[]>([]);
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [foodformdata, setFoodformdata] = useState<DayMenu[]>([
    { day: "Monday", MenuName: "", Price: 0, Image: null, Category: "", Description: "" },
    { day: "Tuesday", MenuName: "", Price: 0, Image: null, Category: "", Description: "" },
    { day: "Wednesday", MenuName: "", Price: 0, Image: null, Category: "", Description: "" },
    { day: "Thursday", MenuName: "", Price: 0, Image: null, Category: "", Description: "" },
    { day: "Friday", MenuName: "", Price: 0, Image: null, Category: "", Description: "" },
    { day: "Saturday", MenuName: "", Price: 0, Image: null, Category: "", Description: "" },
    { day: "Sunday", MenuName: "", Price: 0, Image: null, Category: "", Description: "" },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
   const [Error, setError] = useState<string | null>(null);
   const [Loading, setLoading] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    const updatedData = [...foodformdata];
    updatedData[index] = { ...updatedData[index], [name]: value };
    setFoodformdata(updatedData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files ? e.target.files[0] : null;
    const updatedData = [...foodformdata];
    updatedData[index] = { ...updatedData[index], Image: file };
    setFoodformdata(updatedData);
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>, index: number) => {
    const updatedData = [...foodformdata];
    updatedData[index] = { ...updatedData[index], Category: e.target.value as string };
    setFoodformdata(updatedData);
    
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
      
      for (const menuItem of foodformdata) {
        const formData = new FormData();
        formData.append("provider_id", providerId);
        formData.append("food_name", menuItem.MenuName);
        formData.append("description", menuItem.Description);
        formData.append("price", menuItem.Price.toString());
        formData.append("day", menuItem.day);
        formData.append("category_id", menuItem.Category);
        formData.append("menu_id", selectedMenuId || "");
        if (menuItem.Image) {
          formData.append("image", menuItem.Image);
        } 
         await AddMenuItem(formData);  
         
         
      }
     
      toast.success("Food items added successfully!");
      setFoodformdata(foodformdata.map(item => ({
        ...item,
        MenuName: '',
        Price: 0,
        Image: null,
        Category: '',
        Description: '',
      })));
      
      setOpenModal(false);
    } catch (error) {
      
      toast.error("Failed to add item");
    } finally {
      setIsSubmitting(false);
    }
  };
  
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const providerId = localStorage.getItem("id");
        if (!providerId) {
          setError("Provider ID is missing.");
          setLoading(false);
          return;
        }
        const menuData = await GetMenu(providerId);
        
        setMenuList(menuData || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to get menu items. Please try again later.");
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchMenuData();
    }, []);
 

  const addfooditem = (menuId: string) => {
    setSelectedMenuId(menuId); 
    setOpenModal(true);  
  };

  return (
    <div>
      <BasicModal openModal={openModal} handleClose={() => setOpenModal(false)}>
        <FoodItemForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          foodformdata={foodformdata}
          isSubmitting={isSubmitting}
          handleClose={() => setOpenModal(false)}
          handleImageChange={handleImageChange}
          handleCategoryChange={handleCategoryChange}
          selectedMenuId={selectedMenuId}
 
        />
      </BasicModal>
      <AddMenuContainer onMenuAdded={fetchMenuData} />
      <Displaymenu
        menuList={MenuList}
        loading={Loading}
        error={Error}
        addfooditem={(menuId: string) => addfooditem(menuId)}
      />
    </div>
  );
};

export default DisplayMenu;
