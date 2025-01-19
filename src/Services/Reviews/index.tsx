import api from "../api";


const GetAllReview = async (page: number, filter: 'true' | 'false' = 'false',search:string) => {
  const token = localStorage.getItem("token");
            if (!token) {
              throw new Error("Token not found. Please log in again.");
            }
    const response = await api.get(`/Provider/${ localStorage.getItem('id')}/reviews/list?page=${page}&pageSize=6&search=${search}&filter=${filter}`);

  
    return response.data.result;
 
};

export default GetAllReview;
