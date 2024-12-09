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
    onSubmit: (values: LoginFormValues, helpers: FormikHelpers<LoginFormValues>) => {
      try{
        const formData=new FormData();
      formData.append("email",values.email);
      formData.append("password",values.password);
       PostProviderLogin(formData);
      
      navigate('/home');
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
          alert(`Error: ${error.response?.data?.message || 'Registration failed. Please try again.'}`);
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
