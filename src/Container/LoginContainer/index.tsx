import React from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import LoginComponent from '../../Component/LoginComponent';
import PostProviderLogin from '../../Services/Login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  email: string;
  password: string;

}

function LoginContainer() {
 const navigate=useNavigate();
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
      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        
        const response = await PostProviderLogin(formData);
        
    

        console.log("ksdhjhfbsf,",response.status)
     
        if (response.status== "success") {
       
          const { id, email, token } = response.result;

      
      localStorage.setItem("token", token);
      localStorage.setItem('id', id);
      localStorage.setItem('username', email);
          alert('Login successful!');
          navigate('/details');
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
    
          if (error.response?.status === 401) {
            alert('Incorrect email or password. Please try again.');
          } 
          else {
            alert(`Error: ${error.response?.data?.message || 'Login failed. Please try again.'}`);
          }
        } else {
          console.error('Unexpected error:', error);
          alert('An unexpected error occurred. Please try again.');
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
     
     
      
    />
  );
}

export default LoginContainer;
