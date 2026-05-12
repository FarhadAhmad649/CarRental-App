import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AdminBookings = () => {
  const { backendUrl, token, currencySymbol, userData, isLoader } =
    useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch ALL bookings from the admin route
  const fetchAllBookings = async () => {
    try {
      if (!token) {
        setBookings([]);
        return;
      }

      const response = await axios.get(`${backendUrl}/api/bookings/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 1. Log exactly what the backend sent
      console.log("Backend Raw Data:", response.data);

      // 2. Extract the array (handle both {bookings: []} and raw [])
      const list = Array.isArray(response.data)
        ? response.data
        : response.data.bookings;

      if (list && list.length > 0) {
        const formatted = list.map((db) => {
          // Find the car object safely
          const carInfo = db.carId || db.car || {};

          return {
            ...db,
            // Re-mapping backend names to match what your BookingCard expects
            car: {
              brand: carInfo.brand || "Unknown",
              model: carInfo.model || "Car",
              image: carInfo.image || carInfo.imageUrl || assets.profile_pic,
              year: carInfo.year,
              location: carInfo.location,
            },
            pickupDate: db.startDate || db.pickupDate,
            returnDate: db.endDate || db.returnDate,
            price: db.totalPrice || db.price || db.amount,
          };
        });

        console.log("Formatted Data for State:", formatted);
        setBookings(formatted.reverse());
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Booking Fetch Error:", error);
      toast.error("Could not load bookings");
    } finally {
      setLoading(false);
    }
  };

  // 2. Update the status of a specific booking
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/bookings/admin/status`,
        { bookingId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        toast.success(`Booking marked as ${newStatus}`);
        // Refresh the list to show the new status color
        fetchAllBookings();
      }
    } catch (error) {
      console.error("Status Update Error:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, [token, backendUrl]);

  if (loading) {
    return (
      <div className="text-center p-10 text-gray-500 text-lg">
        Loading Dashboard...
      </div>
    );
  }

  // --- Design Helpers ---
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Booking Management
          </h2>
          <p className="text-sm text-gray-500">
            View and manage all customer reservations.
          </p>
        </div>

        {/* Dashboard Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                  <th className="p-4 font-semibold">Customer</th>
                  <th className="p-4 font-semibold">Car Details</th>
                  <th className="p-4 font-semibold">Rental Period</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking, index) => (
                  <tr
                    key={booking._id || index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Customer Info (Populated from userId) */}
                    <td className="p-4">
                      <p className="text-sm font-semibold text-gray-900">
                        {booking.userId?.name || "Unknown User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.userId?.email || "No email"}
                      </p>
                    </td>

                    {/* Car Info (Populated from carId) */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 rounded bg-gray-100 overflow-hidden shrink-0">
                          <img
                            src={
                              booking.carId?.image ||
                              booking.carId?.imageUrl ||
                              "https://via.placeholder.com/150?text=Car"
                            }
                            alt="car"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {booking.carId?.brand} {booking.carId?.model}
                          </p>
                          <p className="text-xs text-gray-400">
                            ID: {booking._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Dates */}
                    <td className="p-4 text-sm text-gray-600">
                      <p>{new Date(booking.startDate).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-400 text-center">to</p>
                      <p>{new Date(booking.endDate).toLocaleDateString()}</p>
                    </td>

                    {/* Price */}
                    <td className="p-4">
                      <p className="text-sm font-bold text-gray-900">
                        {currencySymbol}
                        {booking.totalPrice}
                      </p>
                    </td>

                    {/* Status Action Dropdown */}
                    <td className="p-4">
                      <select
                        value={booking.status || "Pending"}
                        onChange={(e) =>
                          handleStatusChange(booking._id, e.target.value)
                        }
                        className={`text-xs font-semibold rounded-md px-3 py-1.5 border outline-none cursor-pointer ${getStatusColor(booking.status || "Pending")}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {bookings.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 font-medium">No bookings found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
