import api from "../api";

const GetAllOrders = async (page: number, search: string,filter:string,pageSize:number | "") => {
  try {
      const token = localStorage.getItem("token");
            if (!token) {
              throw new Error("Token not found. Please log in again.");
            }
        
    const response = await api.get(
      `/Order/provider/${ localStorage.getItem('id')}?page=${page}&pageSize=${pageSize}&search=${search}&filter=${filter}`
    );

  
    return response.data.result;
  } catch (error) {
   
    throw new Error("Failed to fetch orders: " + error);
  }
};

export default GetAllOrders;
