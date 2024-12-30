
import api from "../api";

const PostResetPassword = async (data: FormData) => {
 
  
  const response = await api.post(`/Provider/reset-password`,data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default PostResetPassword;


