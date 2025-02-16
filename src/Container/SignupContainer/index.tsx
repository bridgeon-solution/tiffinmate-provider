import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SignupComponent from '../../Component/SignupComponent';
import axios from 'axios';

import PostProviderSignup from '../../Services/SignUp';
import { toast } from 'react-toastify';

interface SignupFormValues {
  username: string;
  email: string;
  file: File | null;
}

function SignupContainer() {
 const [loading, setLoading] = useState<boolean>(false);
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);
  const validationSchema = Yup.object({
    username: Yup.string(),
    email: Yup.string()
   
    .test('containsAt', 'Email must contain @', (value) => value?.includes('@')),
    file: Yup.mixed<File>()
      .nullable()
    
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
    onSubmit: async (values: SignupFormValues) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('user_name', values.username);
        formData.append('email', values.email);
        if (values.file) {
          formData.append('certificateFile', values.file); 
        }
        await PostProviderSignup(formData);
        toast.success('success');
        setIsSignupSuccessful(true); 
       
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const errorResponse = error.response?.data;
          if (errorResponse?.errors) {
            const errorMessages = Object.values(errorResponse.errors).flat().join(", "); 
            toast.error(`Error: ${errorMessages}`);
          } else if(errorResponse.result=="Email already exist") {
            toast.warn(errorResponse.result);
          }else{
            toast.error(errorResponse.result);
          }
        } else {
          toast.error('An unexpected error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }, 
  });

  const { values, handleChange, handleSubmit, setFieldValue } = formik;
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
      isSignupSuccessful={isSignupSuccessful}
      setIsSignupSuccessful={setIsSignupSuccessful}
      loading={loading}  
    />
  );
}

export default SignupContainer;
