import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      {/* --- Logo --- */}
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* --- Navigation Links --- */}
      <ul className="hidden md:flex items-start gap-7 font-medium uppercase">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-(--color-primary) w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/cars">
          <li className="py-1">All Cars</li>
          <hr className="border-none outline-none h-0.5 bg-(--color-primary) w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about-us">
          <li className="py-1">About Us</li>
          <hr className="border-none outline-none h-0.5 bg-(--color-primary) w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      {/* --- Auth / Profile Section --- */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={userData.image || assets.profile_pic}
              alt="profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />

            {/* Dropdown Menu */}
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-xl">
                <p
                  onClick={() => navigate("/user-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-bookings")}
                  className="hover:text-black cursor-pointer"
                >
                  My Bookings
                </p>

                {/* 🔒 Admin Only Link */}
                {userData.role === "admin" && (
                  <p
                    onClick={() => navigate("/admin/bookings")}
                    className="hover:text-blue-600 font-bold cursor-pointer border-t pt-2"
                  >
                    Admin Panel
                  </p>
                )}

                <p
                  onClick={logout}
                  className="hover:text-red-500 cursor-pointer border-t pt-2"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-(--color-primary) text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
