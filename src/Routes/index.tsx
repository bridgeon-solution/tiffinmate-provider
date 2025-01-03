import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TotalOrders = React.lazy(() => import('../Pages/Orders'));
const TotalUsers = React.lazy(() => import('../Pages/users'));
const Signup = React.lazy(() => import('../Pages/Signup'));
const Login = React.lazy(() => import('../Pages/Login'));
const Dashboards = React.lazy(() => import('../Pages/Dashboards'));
const Details = React.lazy(() => import('../Pages/Details'));
const ForgotMail = React.lazy(() => import('../Pages/ForgotMail'));
const Verify = React.lazy(() => import('../Pages/Verify'));
const ResetingPassword = React.lazy(() => import('../Pages/ResetingPassword'));
const Addmenu = React.lazy(() => import('../Pages/AddMenu'));
const ProviderReview = React.lazy(() => import('../Pages/ProviderReview'));
const ProfileCard = React.lazy(() => import('../Component/ProfileComponent'));

const Navbar = React.lazy(() => import('../Atoms/Navbar'));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
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
                  <Route path="/Dashboard" element={<Dashboards />} />
                  <Route path="/addmenu" element={<Addmenu />} />
                  <Route path="/Reviews" element={<ProviderReview />} />
                  <Route path="/profile" element={<ProfileCard />} />
                  <Route path="/orderlist" element={<TotalOrders />} />
                  <Route path="/users" element={<TotalUsers/>} />
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
