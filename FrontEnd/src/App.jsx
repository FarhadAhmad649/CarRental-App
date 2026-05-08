import React, { useState } from "react";
import Navbar from "./compnents/Navbar.jsx";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Cars from './pages/Cars.jsx';
import CarDetails from './pages/CarDetails.jsx';
import Home from './pages/Home.jsx';
import MyBookings from './pages/MyBookings.jsx';
import Footer from "./compnents/Footer.jsx";
import Contact from "./pages/Contact.jsx";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login.jsx";

function App() {
  //const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer position="top-right" />

      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {location.pathname !== "/login" && <Footer />}
    </div>
  );
}

export default App;
