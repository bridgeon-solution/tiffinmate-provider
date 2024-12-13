import React from 'react'
import DetailsComponent from '../../Component/DetailsComponent'
import { useNavigate } from 'react-router-dom'
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import PostProviderDetails from '../../Services/ProviderDetails';
// import axios from 'axios';

interface DetailsFormValues {
  resturentname: string;
  address: string;
  phone: number | null;
  file1: File | null;
  about: string;
  location: string;
  file2: File | null;
  accountnumber: number | null;
}

const id=localStorage.getItem('id');
function DetailsContainer() {
  const navigate=useNavigate();

  const validationSchema = Yup.object({
    resturentname: Yup.string()
      .required("Restaurant name is required"),
    address: Yup.string()
      .required("Address is required"),
    phone: Yup.number()
      .typeError("Phone number must be a valid number")
      .required("Phone number is required")
      .positive("Phone number must be positive")
      .integer("Phone number must be an integer"),
    file1: Yup.mixed<File>()
      .nullable()
      .required("Logo file is required")
      .test(
        'fileFormat',
        'Unsupported file format. Allowed formats: jpg, jpeg, png, pdf',
        (file) => file ? ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type) : true
      )
      .test(
        'fileSize',
        'File size must not exceed 2MB',
        (file) => file ? file.size <= 2 * 1024 * 1024 : true
      ),
    about: Yup.string()
      .required("About field is required")
      .min(10, "About field must be at least 10 characters long"),
    location: Yup.string()
      .required("Location is required"),
    file2: Yup.mixed<File>()
      .nullable()
      .required("Certificate file is required")
      .test(
        'fileFormat',
        'Unsupported file format. Allowed formats: jpg, jpeg, png, pdf',
        (file) => file ? ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type) : true
      )
      .test(
        'fileSize',
        'File size must not exceed 2MB',
        (file) => file ? file.size <= 2 * 1024 * 1024 : true
      ),
    accountnumber: Yup.number()
      .typeError("Account number must be a valid number")
      .required("Account number is required")
      .positive("Account number must be positive")
      .integer("Account number must be an integer"),
  });
  

  const formik = useFormik<DetailsFormValues>({
    initialValues: {
      resturentname: '',
      address: '',
      phone: null,
      file1: null,
      about: '',
      location: '',
      file2: null,
      accountnumber: null,
    },
    validationSchema,
    onSubmit:async(values:DetailsFormValues,helpers:FormikHelpers<DetailsFormValues>)=>{
      try {
        const formData = new FormData();
      formData.append('ProviderId', id || '');
      formData.append('resturent_name', values.resturentname);
      formData.append('address', values.address);
      formData.append('phone_no', values.phone?.toString() || '');
      if (values.file1) {
        formData.append('logo', values.file1);
      }
      formData.append('about', values.about); 
      formData.append('location', values.location);
      formData.append('account_no', values.accountnumber?.toString() || '');
      if (values.file2) {
        formData.append('image', values.file2);
      }

       
        await PostProviderDetails(formData);
    navigate('/Dashboard');
      } finally {
        helpers.resetForm();
      
      }
    }
  });
  const {values,handleChange,handleSubmit,setFieldValue}=formik;
  function handleFileChange(e:React.ChangeEvent<HTMLInputElement>, fieldName: string) {
    const file=e.target.files?.[0]||null;
    setFieldValue(fieldName, file);
    
  }

  

  return (
    <div>
    <DetailsComponent
    formValues={values}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    handleFileChange={handleFileChange}
    />
    </div>
  )
}

export default DetailsContainer
