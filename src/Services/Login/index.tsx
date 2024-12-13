
import api from "../api";

const PostProviderLogin = async (data: FormData) => {
 
  
  const response = await api.post(`/Provider/Login`,data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default PostProviderLogin;


