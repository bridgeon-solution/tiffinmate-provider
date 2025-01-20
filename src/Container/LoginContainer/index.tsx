import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import LoginComponent from '../../Component/LoginComponent';
import PostProviderLogin from '../../Services/Login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import api from '../../Services/api';


interface LoginFormValues {
  email: string;
  password: string;
  

}


function LoginContainer() {
 const navigate=useNavigate();
 const [loading,setLoading]=useState(false);


 const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
   
  });

 
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
     
    },
    validationSchema,
    onSubmit: async (values: LoginFormValues, helpers: FormikHelpers<LoginFormValues>) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        
        const response = await PostProviderLogin(formData)
        if (response.status== "success") {
       
          const { id, email, token,refresh_token } = response.result;
     
       

      localStorage.setItem("token", token);
      localStorage.setItem('id', id);
      localStorage.setItem('username', email);
      localStorage.setItem('refresh_token',refresh_token)
        const check=api.get(`/Provider/CheckDetail?providerId=${id}`);
        if((await check).data.result){
          toast.success('Login successful!');
          navigate('/details');
        }
          toast.success('Login successful!');
          navigate('/dashboard');
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const errorMessage = error.response?.data?.result;
    
       if (status === 500) {
            toast.error(`Server error: ${errorMessage}`);
          } else {
            toast.error(`Error: ${errorMessage}`);
          }
        } else {
          
          toast.error('An unexpected error occurred. Please try again.');
        }
      } finally {
        helpers.resetForm();
      }
    },
    
  }); 
  const { values, handleChange, handleSubmit} = formik;
  return (
    <LoginComponent
      formValues={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit} 
      loading={loading}   
    />
  );
}

export default LoginContainer;
