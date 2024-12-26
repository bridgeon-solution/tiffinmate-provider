
import api from "../api";

const PostProviderLogin = async (data: FormData) => {
 

  const response = await api.post(`/Provider/register`, data);
  return response.data;
};




export default PostProviderLogin;


