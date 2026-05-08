import React from "react";
import assets from '../assets/assets'

const Navbar = ({ setToken }) => {
  // Handle the logout process
  const handleLogout = () => {
    // 1. Clear the token from state (This automatically triggers the Login screen in App.jsx)
    setToken("");
    // 2. Clear it from local storage so they don't stay logged in after a refresh
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between py-4 px-6 md:px-[4%] bg-white shadow-sm">
      {/* Brand Logo / Title */}
      <div className="flex items-center gap-2">
        <img className="text-2xl font-bold text-gray-800 tracking-tight" src={assets.logo} />
        <span className="text-blue-600 text-sm">Admin</span> 
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-[#5f6fff] cursor-pointer text-white px-5 py-2 sm:px-7 rounded-full text-sm font-medium hover:bg-[#1f58d8] transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
