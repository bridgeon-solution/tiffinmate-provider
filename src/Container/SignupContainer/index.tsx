import React from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import SignupComponent from '../../Component/SignupComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostProviderSignup from '../../Services/SignUp';


interface SignupFormValues {
  username: string;
  email: string;
  file: File | null;
}

function SignupContainer() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    file: Yup.mixed<File>()
      .nullable()
      .required('File is required')
      .test('fileSize', 'File size is too large', (file) =>
        file ? file.size <= 5 * 1024 * 1024 : true // Max 5MB
      )
      .test('fileType', 'Unsupported file type', (file) =>
        file ? ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type) : true
      ),
  });

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      username: '',
      email: '',
      file: null,
    },
    validationSchema,
    onSubmit: async (values: SignupFormValues, helpers: FormikHelpers<SignupFormValues>) => {
      try {
        const formData = new FormData();
        formData.append('username', values.username);
        formData.append('email', values.email);
        if (values.file) {
          formData.append('certificate', values.file);
        }
    
        // await axios.post('https://localhost:7009/api/Provider/UploadCertificate', formData);
        await PostProviderSignup(formData);
    
        navigate('/login');
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
    }
    
  });

  const { values, handleChange, handleSubmit, setFieldValue } = formik;

  // File handler to update `file` field in Formik
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setFieldValue('file', file);
  }

  return (
    <SignupComponent
      formValues={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleFileChange={handleFileChange}
    />
  );
}

export default SignupContainer;
