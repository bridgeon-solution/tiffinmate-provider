import api from "../api";


const GetAllReview = async (page: number, filter: 'true' | 'false' = 'false',search:string) => {
  try {
    
    const response = await api.get(`/Provider/${localStorage.getItem("id")}/reviews/list?page=${page}&pageSize=6&search=${search}&filter=${filter}`);

  
    return response.data.result;
  } catch (error) {
   
    throw new Error('Failed to fetch reviews'+error);
  }
};

export default GetAllReview;
