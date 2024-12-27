import api from "../api";

const GetProfile = async () => {
  const response = await api.get(`/Provider/${localStorage.getItem("id")}`);

  return response.data.result; 
};

export default GetProfile;
