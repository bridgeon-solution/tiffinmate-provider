
import api from "../api";

const PostOTP = async (data: FormData) => {
 
  
  const response = await api.post(`/Provider/verify-email-otp`,data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default PostOTP;


