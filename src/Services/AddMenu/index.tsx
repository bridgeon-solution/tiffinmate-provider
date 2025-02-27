import { toast } from "react-toastify";
import api from "../api";

export const AddMenuItem = async (formData: FormData) => {
 
    const response = await api.post('/FoodItem/foodItem', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
    ;
    return response.data;
  
};

export const Getcategory = async () => {
  
    const response = await api.get('/FoodItem/category');
    if (response?.data?.result && response.data.result.length > 0) {
      return response.data.result; 
    }
   else{
    throw Error ("Error occcured");
   }
 
};

export const GetMenu = async (providerId : string) => {
 
    const response = await api.get(`/FoodItem/menu/${providerId}`); 
    if (response?.data?.result && response.data.result.length > 0) {
      return response.data.result; 
    }
   else{
    throw Error ("Error occcured");
   }
  
    
 
};
export const DeleteMenu = async (menuid: string) => {
  try {
    const token = localStorage.getItem("token"); 

    const response = await api.delete(`/FoodItem/menuitems?menu_id=${menuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Item deleted successfully");
  } catch (error) {
    console.error("Error occurred while deleting:", error);
    toast.error("Error occurred while deleting the item");
  }
};



export const DeleteFoodItems = async (foodid: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.delete(`/FoodItem/fooditems?fooditem_id=${foodid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Item deleted successfully");
  } catch (error) {
    console.error("Error occurred while deleting:", error);
    toast.error("Error occurred while deleting the item");
  }
};





export const Getfooditem = async (providerId: string) => {
  try {
      const response = await api.get(`/FoodItem/providerid/${providerId}`);
      if (response?.data?.result && Array.isArray(response.data.result)) {
          return response.data.result; 
      } else {
          return []; 
      }
  } catch (error) {
      console.error("Error fetching food items:", error);
      return []; 
  }
};




export const PostMenu  = async (formData: FormData) => {
 
    const response = await api.post(`/FoodItem/menu/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
    
    return response.data;
 
};


