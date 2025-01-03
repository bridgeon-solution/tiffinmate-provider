import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { jwtDecode } from 'jwt-decode';
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
interface DecodedToken{
  exp:number;
}



function LoginContainer() {
 const navigate=useNavigate();
 const [loading,setLoading]=useState(false);

const isTokenExpired=(token:string):boolean=>{
  try{
    const decoded:DecodedToken=jwtDecode(token);
    const currentTime=Math.floor(Date.now()/1000);
    return decoded.exp<currentTime;

  }catch(err){
    return true;
    console.log(err);
  }
}

const refreshAccessToken=async()=>{
  try{
    const refreshToken=localStorage.getItem('refresh_token');
    if(!refreshToken){
      throw new Error('No refresh_token found');
      
    }
    const response=await api.post('/Refresh',refreshToken);
    if(response.data?.status==='success'){
        const {token,refresh_token}=response.data.result;
        localStorage.setItem('token',token);
        localStorage.setItem('refresh_token',refresh_token);
        return true;
    }else{
      throw new Error(response.data?.error_message || 'Failed to refresh token');
    }
  }catch(err){
    toast.error('Failed to refresh session. Please log in again.');
    localStorage.clear(); 
    navigate('/login'); 
    return null;
    console.log(err);
    
  }
}

axios.interceptors.request.use(
  async(config)=>{
    const token =localStorage.getItem('token');
    if(token && isTokenExpired(token)){
      const success=await refreshAccessToken();
      if(success){
        const newToken=localStorage.getItem('token');
        if(newToken){
          config.headers['Authorization']=`Bearer ${newToken}`;
        }
      }
    }else if(token){
       config.headers['Authorization']=`Bearer ${token}`
    }
    return config;
  },
  (error=>{
    return Promise.reject(error);
  })
)

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
        
          toast.success('Login successful!');
          navigate('/details');
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          
    
          if (error.response?.status === 401) {
           
            toast.error("Incorrect email or password. Please try again.")
          } 
          else {
            
            toast.error(`Error: ${error.response?.data?.result || 'Login failed. Please try again.'}`)
          }
        } else {
      
        
          toast.error('An unexpected error occurred. Please try again.')
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
