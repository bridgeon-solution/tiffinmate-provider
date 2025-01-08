import api from "../api";

const GetProfile = async () => {
   const token = localStorage.getItem("token");
              if (!token) {
                throw new Error("Token not found. Please log in again.");
              }
          
              
  const response = await api.get(`/Provider/${ localStorage.getItem('id')}`);

  return response.data.result; 
};

export default GetProfile;
