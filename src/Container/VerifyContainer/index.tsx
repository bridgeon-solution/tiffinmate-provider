import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OtpComponent from '../../Component/VerifyComponent';
import PostOTP from '../../Services/OTP';

interface VerifyOTOValues {
  email: string;
  otp: string;

}

function OtpContainer() {
 const navigate=useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    otp: Yup.string().required('Password is required'),
   
  });

 
  const formik = useFormik<VerifyOTOValues>({
    initialValues: {
      email: '',
      otp: '',
     
    },
    validationSchema,
    onSubmit: async (values: VerifyOTOValues, helpers: FormikHelpers<VerifyOTOValues>) => {
      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("otp", values.otp);
        
        const response = await PostOTP(formData);
 
        if (response.status== "success") {
 
          navigate('/resetpassword');
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
    <OtpComponent
      formValues={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
     
     
      
    />
  );
}

export default OtpContainer;
