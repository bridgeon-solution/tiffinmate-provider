import api from "../api";

export const AddMenuItem = async (formData: FormData) => {
  try {
    const response = await api.post('/FoodItem/foodItem', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const Getcategory = async () => {
  try {
    const response = await api.get('/FoodItem/category');
    return response.data.result; 
  } catch (error) {
    throw error;
  }
};

export const GetMenu = async (providerId : string) => {
  try {
    const response = await api.get(`/FoodItem/menu/${providerId}`); 
    return response.data.result;  
  } catch (error) {
    throw error;
  }
};

export const Getfooditem = async (providerId : string) => {
  try {
    const response = await api.get(`/FoodItem/providerid/${providerId}`);
    
    return response.data.result; 
  } catch (error) {
    throw error;
  }
};



