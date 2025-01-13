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

export const Getfooditem = async (providerId : string) => {

    const response = await api.get(`/FoodItem/providerid/${providerId}`);
    if (response?.data?.result && response.data.result.length > 0) {
      return response.data.result; 
    }
   else{
    throw Error ("Error occcured");
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


