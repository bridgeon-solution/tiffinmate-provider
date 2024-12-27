import api from "../api";

const PutProfile = async (data: FormData) => {
  const response = await api.put(`/Provider/editdetails`, data); // Remove explicit headers
  return response.data;
};

export default PutProfile;
