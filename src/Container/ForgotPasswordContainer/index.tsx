import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from '../../Services/ForgotPassword';
import ForgotComponent from '../../Component/ForgotPassword';

interface ForgotPasswordFormValues {
  email: string;
}

function ForgotContainer() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const response = await ForgotPassword({ email: values.email });
        if (response.status === 'success') {
          navigate('/verification');
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
          alert(
            error.response?.data?.message ||
            'An error occurred. Please try again.'
          );
        } else {
          console.error('Unexpected error:', error);
          alert('An unexpected error occurred. Please try again.');
        }
      } finally {
        helpers.resetForm();
      }
    },
  });

  const { values, handleChange, handleSubmit } = formik;

  return (
    <ForgotComponent
      formValues={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default ForgotContainer;
