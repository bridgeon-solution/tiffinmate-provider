import api from "../api";

const ForgotPassword = async (data: { email: string }) => {
  const response = await api.post(`/Provider/forgot-passowrd`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export default ForgotPassword;
