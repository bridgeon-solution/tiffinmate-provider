
import api from "../api";


const GetUserDetails = async (page: number, search: string, pageSize: number | "",userId:string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found. Please log in again.");
    }

    const response = await api.get(
      `/Order/users/${ localStorage.getItem('id')}?UserId=${userId}&page=${page}&pageSize=${pageSize}&search=${search}`
    );

    return response.data.result;
  } catch (error) {
    throw new Error("Failed to fetch orders: " + error);
  }
};

export default GetUserDetails;
