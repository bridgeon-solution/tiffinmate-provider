import api from "../api";

const UpdateProfile = async (data: FormData) => {
  const response = await api.put(`/Provider/editdetails`, data); 
  return response.data;
};

export default UpdateProfile;
