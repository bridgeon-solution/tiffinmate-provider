
import api from "../api";

const PostProviderLogin = async (data: FormData) => {
 

  const response = await api.post(`/Provider/addprovider`, data);
  return response.data;
};




export default PostProviderLogin;


