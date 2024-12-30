import React from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import SignupComponent from '../../Component/SignupComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostProviderSignup from '../../Services/SignUp';
import { toast } from 'react-toastify';

interface SignupFormValues {
  username: string;
  email: string;
  file: File | null;
}

function SignupContainer() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
    .required('Email is required')
    .test('containsAt', 'Email must contain @', (value) => value?.includes('@')),
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
          formData.append('certificateFile', values.file); 
        }

       

        await PostProviderSignup(formData);
        toast.success('success');
        navigate('/login');
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error('Error response:', error.response?.data);
 
        } else {
         
      
          toast.error('An unexpected error occurred. Please try again.')
        }
      } finally {
        helpers.resetForm();
      }
    }, 
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
