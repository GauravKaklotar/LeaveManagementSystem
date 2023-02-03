import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
export default function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
      {/* <Layout />   */}
        <Route path="/" exact element={<Register />}></Route>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/reset-password" exact element={<ForgotPassword />}></Route>
        <Route path="/home" exact element={<Home />}></Route>
        <Route path="/home/about" exact element={<About />}></Route>
        <Route path="/home/contact" exact element={<Contact />}></Route>
        <Route path="/home/services" exact element={<Services />}></Route>
      </Routes>
    </BrowserRouter>
   </>
  )
}