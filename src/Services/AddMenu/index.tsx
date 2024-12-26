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
    console.error('Error adding menu item:', error);
    throw error;
  }
};

export const Getcategory = async () => {
  try {
    const response = await api.get('/FoodItem/category');
    console.log(response.data.result);
    return response.data.result; 
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

export const GetMenu = async (providerId : string) => {
  try {
    const response = await api.get(`/FoodItem/menu/${providerId}`); 
    return response.data.result; 
   
  } catch (error) {
    console.error('Error getting menu:', error);
    throw error;
  }
};

export const Getfooditem = async (providerId : string) => {
  try {
    const response = await api.get(`/FoodItem/providerid/${providerId}`);
    
    return response.data.result; 
  } catch (error) {
    console.error('Error getting fooditem:', error);
    throw error;
  }
};



