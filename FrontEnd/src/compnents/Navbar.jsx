import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  // Animation for the Active Link HR
  const activeLineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: "60%", opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <nav className="flex items-center justify-between py-4 mb-5 border-b border-b-gray-400 relative">
      {/* Logo Area */}
      <motion.img
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Navigation Links - Desktop */}
      <ul className="hidden md:flex md:gap-8 items-center font-medium uppercase text-sm">
        {["Home", "Cars", "My Bookings"].map((item) => {
          const path =
            item === "Home" ? "/" : item === "Cars" ? "/doctors" : "/about";
          return (
            <NavLink
              key={item}
              to={path}
              className="group flex flex-col items-center"
            >
              {({ isActive }) => (
                <>
                  <li
                    className={`py-1 transition-colors ${isActive ? "text-[#5f6fff]" : "text-gray-700"}`}
                  >
                    {item.replace("_", " ")}
                  </li>
                  {/* Animated underline for active state */}
                  {isActive ? (
                    <motion.hr
                      layoutId="navUnderline"
                      className="border-none outline-none h-0.5 bg-[#5f6fff] w-full"
                    />
                  ) : (
                    <div className="h-0.5 w-0 group-hover:w-full bg-gray-300 transition-all duration-300" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </ul>

      {/* Action Button Area */}
      <div className="flex items-center gap-4">
        {token ? (
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={assets.user_profile}
            onClick={() => navigate("/profile")}
            className="bg-[#5f6FFF] w-10 h-10 rounded-full cursor-pointer object-cover"
          />
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="bg-[#5f6FFF] text-white px-8 py-2.5 rounded-full font-light hidden md:block"
          >
            Login
          </motion.button>
        )}

        {/* Mobile Menu Toggle */}
        <img
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
          onClick={() => setShowMenu(true)}
        />
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white shadow-2xl z-50 md:hidden p-6"
            >
              <div className="flex justify-between items-center mb-10">
                <img src={assets.logo} className="w-32" alt="Logo" />
                <img
                  onClick={() => setShowMenu(false)}
                  className="w-7 cursor-pointer"
                  src={assets.close_icon}
                  alt="Close"
                />
              </div>

              <ul className="flex flex-col gap-6 text-lg font-medium">
                {[
                  ["HOME", "/"],
                  ["CARS", "/collection"],
                  ["MY BOOKINGS", "/about"],
                ].map(([label, path]) => (
                  <NavLink
                    key={label}
                    to={path}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      `block border-b pb-2 ${isActive ? "text-[#5f6fff] border-[#5f6fff]" : "text-gray-600 border-gray-100"}`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
