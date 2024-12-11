
import api from "../api";

const PostProviderLogin = async (data: FormData) => {
  console.log('FormData contents before sending:', Array.from(data.entries()));

  const response = await api.post(`/Provider/addprovider`, data);
  return response.data;
};




export default PostProviderLogin;


