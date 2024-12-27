import api from "../api";

const GetProfile = async () => {
  const response = await api.get(`/Provider/${localStorage.getItem("id")}`);
  console.log(response.data.result); 
  return response.data.result; 
};

export default GetProfile;
