import React, { useEffect } from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PageNotFound from './pages/PageNotFound';
import Sidebar from './pages/Sidebar';

import NewLeave from './pages/Employees/NewLeave';
import PendingLeave from './pages/Employees/PendingLeave';
import TrackLeave from './pages/Employees/TrackLeave';
import Settings from './pages/Employees/Settings';

export default function App() {

  // const navigate = useNavigate();

  // const callAuth = async () => {
  //   try {
  //     const res = await fetch('/', {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         "Content-Type": "application/json",
  //       },

  //       credentials: 'include',

  //     });

  //     const data = await res.json();
  //     console.log(data);

  //     if(!res.status===200) {
  //       throw new Error(res.error);
  //     }
  //   }
  //   catch(err) {
  //     console.log(err);
  //     navigate('/login');
  //   }
  // }

  // useEffect(() => {
  //   callAuth();
  // }, []);


  return (
   <>
    {/* <BrowserRouter> */}
      <Routes>
      {/* <Layout />   */}
        <Route path="/" element={<Sidebar />} />
        <Route path="/register" exact element={<Register />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/reset-password" exact element={<ForgotPassword />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>

        // Employee
        <Route path="/settings" exact element={<Settings />}></Route>
        <Route path="/new-leave" exact element={<NewLeave />}></Route>
        <Route path="/pending-leave" exact element={<PendingLeave />}></Route>
        <Route path="/tract-leave" exact element={<TrackLeave />}></Route>
      </Routes>
    {/* </BrowserRouter> */}
   </>
  )
}