import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  PlusCircle, 
  CarFront, 
  CalendarCheck 
} from "lucide-react"; // Imported matching icons!

const Sidebar = () => {
  // Extracted the class logic to keep the JSX clean
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 p-3 md:px-4 md:py-2.5 rounded-lg md:rounded-r-none md:rounded-l-lg transition-all duration-200 justify-center md:justify-start md:border md:border-r-0 ${
      isActive 
        ? "bg-blue-50 md:bg-gray-100 text-blue-600 md:border-blue-500 shadow-sm md:shadow-none" 
        : "text-gray-500 hover:bg-gray-50 md:border-transparent"
    }`;

  return (
    //{/* w-16 on mobile (just icons), w-[18%] on medium screens and up */}
    <div className="w-16 md:w-[20%] lg:w-[18%] min-h-screen border-r-2 border-gray-200 bg-white shrink-0 transition-all duration-300">
      
      {/* Centered padding on mobile, right-aligned padding on desktop */}
      <div className="flex flex-col gap-4 pt-6 px-2 md:pl-[15%] text-[15px]">
        
        {/* DASHBOARD LINK */}
        <NavLink className={navLinkClasses} to="/">
          <LayoutDashboard className="w-5 h-5 shrink-0" strokeWidth={2.5} />
          <span className="hidden md:block font-medium">Dashboard</span>
        </NavLink>

        {/* ADD CAR LINK */}
        <NavLink className={navLinkClasses} to="/add">
          <PlusCircle className="w-5 h-5 shrink-0" strokeWidth={2.5} />
          <span className="hidden md:block font-medium">Add Car</span>
        </NavLink>

        {/* LIST CARS LINK */}
        <NavLink className={navLinkClasses} to="/list">
          <CarFront className="w-5 h-5 shrink-0" strokeWidth={2.5} />
          <span className="hidden md:block font-medium">Manage Cars</span>
        </NavLink>

        {/* MANAGE BOOKINGS */}
        <NavLink className={navLinkClasses} to="/admin/bookings">
          <CalendarCheck className="w-5 h-5 shrink-0" strokeWidth={2.5} />
          <span className="hidden md:block font-medium">Manage Bookings</span>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;