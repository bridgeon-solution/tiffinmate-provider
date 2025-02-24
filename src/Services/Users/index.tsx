
import api from "../api";


const GetAllUsers = async (page: number, search: string, pageSize: number | "") => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found. Please log in again.");
    }

    const response = await api.get(
      `/User/${ localStorage.getItem('id')}?page=${page}&pageSize=${pageSize}&search=${search}`
    );

    return response.data.result;
  } catch (error) {
    throw new Error("Failed to fetch orders: " + error);
  }
};

export default GetAllUsers;










