import axios from "axios";

const BASE_URL = "https://localhost:7009/api";

const PostProviderLogin = async (data: FormData) => {
  const response = await axios.post(`${BASE_URL}/Provider/Login`, data, {
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  });
  return response.data;
};

export default PostProviderLogin;
