import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Bookings = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // 1. Fetch all user bookings/orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/booking/list`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success || response.status === 200) {
        // Reverse so the newest bookings show up at the top
        setOrders(
          response.data.orders?.reverse() || response.data.reverse() || [],
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  // 2. Update the status of a booking
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/booking/status`,
        {
          orderId,
          status: event.target.value,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success || response.status === 200) {
        toast.success("Order status updated!");
        fetchAllOrders(); // Refresh the screen to show the new status
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold">Manage Car Bookings</h3>

      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start sm:items-center gap-3 p-5 md:p-8 border border-gray-200 bg-white rounded-lg shadow-sm text-sm text-gray-700"
          >
            {/* Box Icon (Just for visual styling) */}
            <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full">
              📅
            </div>

            {/* Booking Details */}
            <div>
              <p className="font-semibold text-gray-900 mb-1">
                {/* Assuming your backend populates the car details or sends car info in the order */}
                {order.carName || "Car Rental Booking"}
              </p>
              <div className="mt-2">
                <p>
                  <strong>Name:</strong> {order.userData?.name || "Customer"}
                </p>
                <p>
                  <strong>Phone:</strong> {order.userData?.phone || "N/A"}
                </p>
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-sm sm:text-center font-semibold text-green-600">
                Total: {currency}
                {order.amount || order.totalPrice}
              </p>
            </div>

            {/* Status Dropdown */}
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 font-semibold border border-gray-300 rounded outline-none cursor-pointer focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Active">Active (Car is out)</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No bookings found yet. Time to market the app!
          </p>
        )}
      </div>
    </div>
  );
};

import axios from "axios"; // Add this import at the top
import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets"; // removed dummyMyBookingsData
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify"; // Optional: for error messages

// ... keep statusConfig and BookingCard exactly the same ...

function MyBookings() {
  // Pull what we need from context
  const { currencySymbol, token, backendUrl } = useContext(AppContext);
  
  // Create state for our real data
  const [bookingsData, setBookingsData] = useState([]);

  // Fetch real user bookings from the backend
  const fetchUserBookings = async () => {
    try {
      if (!token) {
        return null; // Don't fetch if not logged in
      }

      const response = await axios.post(`${backendUrl}/api/booking/userorders`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success || response.status === 200) {
        // Assuming your backend returns an array of orders in response.data.orders
        setBookingsData(response.data.orders?.reverse() || response.data.reverse() || []);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch your bookings");
    }
  };

  // Run the fetch function when the component loads, or when the token changes
  useEffect(() => {
    fetchUserBookings();
  }, [token]);

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="min-h-screen bg-gray-50/60 py-10 px-4">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {/* Header */}
          <div
            className="text-center"
            style={{ animation: "fadeSlideUp 0.4s ease-out both" }}
          >
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              My Bookings
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              View and manage all your car reservations
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {/* Swapped dummyMyBookingsData for our real bookingsData state */}
            {bookingsData.map((booking, index) => (
              <BookingCard
                key={index}
                booking={booking}
                index={index}
                currencySymbol={currencySymbol}
              />
            ))}
          </div>

          {/* Empty State */}
          {bookingsData.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">🚗</p>
              <p className="font-medium text-gray-500">No bookings yet</p>
              <p className="text-sm mt-1">
                Your upcoming rentals will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyBookings;
