import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2 bg-white">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {/* ADD CAR LINK */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${isActive ? "bg-gray-100 border-blue-500 text-blue-600" : ""}`
          }
          to="/add"
        >
          <span className="hidden md:block">Add Car</span>
        </NavLink>

        {/* LIST CARS LINK */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${isActive ? "bg-gray-100 border-blue-500 text-blue-600" : ""}`
          }
          to="/list"
        >
          <span className="hidden md:block">Manage Cars</span>
        </NavLink>

        {/* MANAGE BOOKINGS */}
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${isActive ? "bg-gray-100 border-blue-500 text-blue-600" : ""}`
          }
          to="/admin/bookings"
        >
          <span className="hidden md:block">Manage Bookings</span>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
