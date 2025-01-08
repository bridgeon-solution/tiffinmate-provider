import api from "../api";

const GetAllSubscription = async (page: number, search: string, filter: string, pageSize: number | "",toggle: 'true' | 'false' = 'false') => {
  try {
    
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found. Please log in again.");
    }
      const response = await api.get(
          `/Subscription/provider/${ localStorage.getItem('id')}?page=${page}&pageSize=${pageSize}&search=${search}&filter=${filter}&toggle=${toggle}`
      );
     
      
      return response.data.result;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    throw new Error("Failed to fetch orders: " + error);
  }
};

export default GetAllSubscription;
