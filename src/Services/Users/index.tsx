import api from "../api";

const GetAllUsers = async (page: number, search: string) => {
  try {
    const response = await api.get(
      `/Order/${localStorage.getItem("id")}/users/list?page=${page}&pageSize=6&search=${search}`
    );

    console.log("API Response:", response.data); 
    return response.data.result;
  } catch (error) {
    console.error("API Error:",  error); 
    throw new Error("Failed to fetch orders: " + error);
  }
};

export default GetAllUsers;
