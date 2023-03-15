import React, { useEffect } from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SentEmail from './pages/SentEmail';
import OTP from "./pages/OTP";
import PageNotFound from './pages/PageNotFound';
import Sidebar from './pages/Sidebar';
import Home from './pages/Home';
import Navbar from './pages/Employees/Navbar';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ChangePassword from './pages/ChangePassword';
import ForgetPassword from './pages/ForgetPassword';


import NewLeave from './pages/Employees/NewLeave';
import PendingLeave from './pages/Employees/PendingLeave';
import TrackLeave from './pages/Employees/TrackLeave';
import Settings from './pages/Employees/Settings';
import Leave from './pages/Employees/Leave';
import RejectedLeave from './pages/Employees/RejectedLeave';
import Dashboard from './pages/Employees/Dashboard';
import AcceptedLeave from './pages/Employees/AcceptedLeave';
import EditLeave from './pages/Employees/EditLeave';

import HDashboard from './pages/HOD/HDashboard';
import HLeave from './pages/HOD/HLeave';
import HPendingLeave from './pages/HOD/HPendingLeave';
import HRejectedLeave from './pages/HOD/HRejectedLeave';
import HAcceptedLeave from './pages/HOD/HAcceptedLeave';
import HSettings from './pages/HOD/HSettings';
import HEmployees from './pages/HOD/HEmployees';
import HEditLeave from './pages/HOD/HEditLeave';

import ADashboard from './pages/Admin/ADashboard';
import ALeave from './pages/Admin/ALeave';
import APendingLeave from './pages/Admin/APendingLeave';
import ARejectedLeave from './pages/Admin/ARejectedLeave';
import AAcceptedLeave from './pages/Admin/AAcceptedLeave';
import ASettings from './pages/Admin/ASettings';
import AHODList from './pages/Admin/AHODList';
import AEmployeeList from './pages/Admin/AEmployeeList';
import AAddHOD from './pages/Admin/AAddHOD';
import AAddEmployee from './pages/Admin/AAddEmployee';
import AEditLeave from './pages/Admin/AEditLeave';
export default function App() {


  return (
   <>
   <ToastContainer />
    {/* <BrowserRouter> */}
      <Routes>
      {/* <Layout />   */}
        <Route path="/register" exact element={<Register />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/reset-password" exact element={<SentEmail />}></Route>
        <Route path="/verifyOTP/:email" exact element={<OTP />}></Route>
        <Route path="/change-password" exact element={<ChangePassword />}></Route>
        <Route path="/forget-password/:email/:otp" exact element={<ForgetPassword />}></Route>
        
        <Route path="*" element={<PageNotFound />}></Route>

        // Employee
        <Route path="/" exact element={<Home />} />
        {/* <Route path="/" exact element={<Dashboard />} /> */}
        {/* <Route path="/employee" exact element={<Navbar />} /> */}
        <Route path="/dashboard" exact element={<Dashboard />}></Route>
        <Route path="/settings" exact element={<Settings />}></Route>
        <Route path="/leave" exact element={<Leave />}></Route>
        <Route path="/new-leave" exact element={<NewLeave />}></Route>
        <Route path="/pending-leave" exact element={<PendingLeave />}></Route>
        <Route path="/rejected-leave" exact element={<RejectedLeave />}></Route>
        <Route path="/accepted-leave" exact element={<AcceptedLeave />}></Route>
        <Route path="/track-leave/:id" exact element={<TrackLeave />}></Route>
        <Route path="/edit-leave/:id" exact element={<EditLeave />}></Route>


        // HOD
        <Route path="/HDashboard" exact element={<HDashboard />} />
        <Route path="/HLeave" exact element={<HLeave />} />
        <Route path="/HPendingLeave" exact element={<HPendingLeave />} />
        <Route path="/HAcceptedLeave" exact element={<HAcceptedLeave />} />
        <Route path="/HRejectedLeave" exact element={<HRejectedLeave />} />
        {/* <Route path="/HNewLeave" exact element={<HDashboard />} /> */}
        <Route path="/HSettings" exact element={<HSettings />} />
        <Route path="/HEmployees" exact element={<HEmployees />} />
        <Route path="/HEditLeave/:id" exact element={<HEditLeave />}></Route>


        // Admin
        <Route path="/ADashboard" exact element={<ADashboard />} />
        <Route path="/ALeave" exact element={<ALeave />} />
        <Route path="/APendingLeave" exact element={<APendingLeave />} />
        <Route path="/AAcceptedLeave" exact element={<AAcceptedLeave />} />
        <Route path="/ARejectedLeave" exact element={<ARejectedLeave />} />
        <Route path="/ASettings" exact element={<ASettings />} />
        <Route path="/AAddHOD" exact element={<AAddHOD />} />
        <Route path="/AHODList" exact element={<AHODList />} />
        <Route path="/AAddEmployee" exact element={<AAddEmployee />} />
        <Route path="/AEmployeeList" exact element={<AEmployeeList />} />
        <Route path="/AEditLeave/:id" exact element={<AEditLeave />}></Route>


      </Routes>
    {/* </BrowserRouter> */}
   </>
  )
}