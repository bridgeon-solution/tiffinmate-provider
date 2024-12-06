import axios from "axios";

const BASE_URL = "https://localhost:7009/api";

const PostProviderSignup = async (data: FormData) => {
  const response = await axios.post(`${BASE_URL}/Provider/UploadCertificate`, data, {
    headers: {
      'Content-Type': 'multipart/form-data', //a file upload -interpreted
    },
  });
  return response;
};

export default PostProviderSignup;
