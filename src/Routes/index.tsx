import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';


import 'react-toastify/dist/ReactToastify.css';
import Subscription from '../Pages/Subscription';

const TotalOrders = React.lazy(() => import('../Pages/Orders'));
const TotalUsers = React.lazy(() => import('../Pages/ProviderUsers'));

import AddmenuPage from '../Pages/AddMenupage';
import Menudisplay from '../Pages/DisplayFooditems';


const Signup = React.lazy(() => import('../Pages/Signup'));
const Login = React.lazy(() => import('../Pages/Login'));
const Dashboards = React.lazy(() => import('../Pages/Dashboards'));
const Details = React.lazy(() => import('../Pages/Details'));
const ForgotMail = React.lazy(() => import('../Pages/ForgotMail'));
const Verify = React.lazy(() => import('../Pages/Verify'));
const ResetingPassword = React.lazy(() => import('../Pages/ResetingPassword'));
const ProviderReview = React.lazy(() => import('../Pages/ProviderReview'));
const ProfileCard = React.lazy(() => import('../Component/ProfileComponent'));
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Box, CircularProgress } from '@mui/material';

const Navbar = React.lazy(() => import('../Atoms/Navbar'));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress/>
</Box>}>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/details" element={<Details />} />
          <Route path="/mail" element={<ForgotMail />} />
          <Route path="/verification" element={<Verify />} />
          <Route path="/resetpassword" element={<ResetingPassword />} />
          <Route
            path="/*"
            element={
              <Navbar>
                <Routes>
                <Route path='/Dashboard' element={<Dashboards/>} />
                <Route path="/Reviews" element={<ProviderReview />} />
                  <Route path="/profile" element={<ProfileCard />} />
                  <Route path="/orderlist" element={<TotalOrders />} />
                  <Route path="/users" element={<TotalUsers/>} />

                  <Route path="/subscriptions" element={<Subscription/>} />

                <Route path='/addmenu' element={<AddmenuPage/>} />
                <Route path='/displayfoods' element={<Menudisplay/>} />

                </Routes>
              </Navbar>
            }
          />
        </Routes>
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default AppRouter;
