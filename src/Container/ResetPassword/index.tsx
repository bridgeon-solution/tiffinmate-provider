import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ResetPasswordComponent from '../../Component/ResetPasswprdComponent';
import PostResetPassword from '../../Services/ResetPassword';
import { toast } from 'react-toastify';

interface ResetPasswordValues {
  email: string;
  password: string;

}

function ResetPasswordContainer() {
 const navigate=useNavigate();
 const location = useLocation();
   const email = location.state?.email || '';
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
   
  });

 
  const formik = useFormik<ResetPasswordValues>({
    initialValues: {
      email: '',
      password: '',
     
    },
    validationSchema,
    onSubmit: async (values: ResetPasswordValues, helpers: FormikHelpers<ResetPasswordValues>) => {
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", values.password);
        
        const response = await PostResetPassword(formData);

        if (response.status== "success") {

          navigate('/Login');
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
     
    toast.error('Axios error:', error.response?.data || error.message)
          if (error.response?.status === 401) {
            toast.error('Incorrect email or password. Please try again.')
           
          } 
          else {
           
            toast.error(`Error: ${error.response?.data?.message || 'Login failed. Please try again.'}`)
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
    <ResetPasswordComponent
      formValues={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
     
     
      
    />
  );
}

export default ResetPasswordContainer;
