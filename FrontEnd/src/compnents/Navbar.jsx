import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";

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
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 relative">
      {/* --- Logo --- */}
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* --- Desktop Navigation Links --- */}
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
      <div className="flex items-center gap-3">
        {token && userData ? (
          <>
            {/* Desktop dropdown */}
            <div className="hidden md:flex items-center gap-2 cursor-pointer group relative">
              <img
                className="w-8 rounded-full"
                src={userData.image || assets.boy}
                alt="profile"
              />
              <img className="w-2.5" src={assets.dropdown_icon} alt="" />

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
                  {userData.role === "admin" && (
                    <p
                      onClick={() =>
                        (window.location.href = "http://localhost:5174")
                      }
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

            {/* Mobile: avatar taps open the menu */}
            <img
              onClick={() => setShowMenu(true)}
              className="w-8 h-8 rounded-full object-cover cursor-pointer md:hidden border-2 border-gray-200"
              src={userData.image || assets.boy}
              alt="profile"
            />
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-(--color-primary) text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        {/* Mobile hamburger */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* --- Mobile Navigation Menu --- */}
      <div
        className={`md:hidden absolute top-0 right-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300 ${showMenu ? "fixed w-full h-screen" : "h-0 w-0"}`}
      >
        <div className="flex items-center justify-between px-5 py-6">
          <img className="w-36" src={assets.logo} alt="Logo" />
          <img
            className="w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.close_icon}
            alt="Close"
          />
        </div>

        {/* Profile summary at top of menu if logged in */}
        {token && userData && (
          <div className="mx-5 mb-4 p-4 bg-gray-50 rounded-xl flex items-center gap-3 border border-gray-100">
            <img
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 shrink-0"
              src={userData.image || assets.boy}
              alt="profile"
            />
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 truncate">
                {userData.name}
              </p>
              <p className="text-xs text-gray-400 truncate">{userData.email}</p>
            </div>
          </div>
        )}

        <ul className="flex flex-col items-center gap-2 px-5 text-lg font-medium uppercase">
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/"
            className={({ isActive }) =>
              `w-full text-center py-2 rounded-md transition-colors ${isActive ? "bg-gray-100 text-(--color-primary) font-bold" : "hover:bg-gray-100"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/cars"
            className={({ isActive }) =>
              `w-full text-center py-2 rounded-md transition-colors ${isActive ? "bg-gray-100 text-(--color-primary) font-bold" : "hover:bg-gray-100"}`
            }
          >
            All Cars
          </NavLink>
          <NavLink
            onClick={() => setShowMenu(false)}
            to="/about-us"
            className={({ isActive }) =>
              `w-full text-center py-2 rounded-md transition-colors ${isActive ? "bg-gray-100 text-(--color-primary) font-bold" : "hover:bg-gray-100"}`
            }
          >
            About Us
          </NavLink>

          {/* Profile links when logged in */}
          {token && userData && (
            <>
              <div className="w-full border-t border-gray-100 my-1" />
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/user-profile"
                className={({ isActive }) =>
                  `w-full text-center py-2 rounded-md transition-colors normal-case ${isActive ? "bg-gray-100 text-(--color-primary) font-bold" : "hover:bg-gray-100"}`
                }
              >
                My Profile
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/my-bookings"
                className={({ isActive }) =>
                  `w-full text-center py-2 rounded-md transition-colors normal-case ${isActive ? "bg-gray-100 text-(--color-primary) font-bold" : "hover:bg-gray-100"}`
                }
              >
                My Bookings
              </NavLink>

              {userData?.role?.toLowerCase() === "admin" && (
                <button
                  onClick={() => {
                    setShowMenu(false);
                    window.location.href = import.meta.env.VITE_ADMIN_PANEL_URL;
                  }}
                  className="w-full text-center py-2 rounded-md text-blue-600 font-bold hover:bg-blue-50 transition-colors normal-case"
                >
                  Admin Panel
                </button>
              )}

              <div className="w-full border-t border-gray-100 my-1" />
              <button
                onClick={() => {
                  setShowMenu(false);
                  logout();
                }}
                className="w-full text-center py-2 rounded-md text-red-500 hover:bg-red-50 transition-colors normal-case"
              >
                Logout
              </button>
            </>
          )}

          {!token && (
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/login");
              }}
              className="bg-(--color-primary) text-white px-8 py-3 rounded-full font-light mt-4 w-3/4"
            >
              Create account
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
