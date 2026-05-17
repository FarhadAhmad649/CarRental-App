import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/AddCar";
import List from "./pages/ManageCars";
import Login from "./pages/Login";
import AdminBookings from "./pages/AdminBookings";
import { ToastContainer } from "react-toastify";
import { Dashboard } from "./pages/Dashboard";
import RevenueList from "./pages/RevenueList";
import { AppContext } from "./context/AppContext";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

function App() {
  const { token, setToken } = useContext(AppContext);

  return (
    <div className="bg-gray-50 h-screen flex flex-col">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-y-auto px-6 py-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route
                  path="/admin/bookings"
                  element={<AdminBookings token={token} />}
                />
                <Route path="/" element={<Dashboard token={token} />} />
                <Route
                  path="/admin/revenue"
                  element={<RevenueList token={token} />}
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
