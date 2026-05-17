import { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const AdminBookings = ({ token }) => {
  const { backendUrl, currencySymbol } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllBookings = useCallback(async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/bookings/admin/bookings`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const list = Array.isArray(response.data)
        ? response.data
        : response.data.bookings;
      if (list && list.length > 0) {
        setBookings(list.reverse());
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Could not load bookings");
    } finally {
      setLoading(false);
    }
  }, [backendUrl, token]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/bookings/admin/status`,
        { bookingId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        toast.success(`Booking marked as ${newStatus}`);
        fetchAllBookings();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/bookings/admin/delete`,
        { bookingId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        toast.success("Booking deleted successfully");
        fetchAllBookings();
      } else {
        toast.error(response.data.message || "Failed to delete booking");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred while deleting",
      );
    }
  };

  useEffect(() => {
    if (!token) return;
    const timer = setTimeout(() => {
      fetchAllBookings();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchAllBookings, token]);

  const statusConfig = {
    Pending: {
      dot: "bg-amber-400",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
    },
    Confirmed: {
      dot: "bg-blue-400",
      badge: "bg-blue-50 text-blue-700 border-blue-200",
    },
    Completed: {
      dot: "bg-emerald-400",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    Cancelled: {
      dot: "bg-red-400",
      badge: "bg-red-50 text-red-700 border-red-200",
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading bookings…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-7 w-1 rounded-full bg-linear-to-b from-blue-500 to-violet-500" />
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            All Bookings
          </h2>
          <span className="ml-auto text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {bookings.length} total
          </span>
        </div>

        {/* ── DESKTOP TABLE ── */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left table-fixed">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-widest text-gray-400 font-semibold">
                <th className="px-5 py-3.5 w-10">#</th>
                <th className="px-5 py-3.5 w-[18%]">Customer</th>
                <th className="px-5 py-3.5 w-[22%]">Vehicle</th>
                <th className="px-5 py-3.5 w-[20%]">Period</th>
                <th className="px-5 py-3.5 w-[12%]">Amount</th>
                <th className="px-5 py-3.5 w-[18%]">Status</th>
                <th className="px-5 py-3.5 w-[10%] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {bookings.map((booking, index) => {
                const status = booking.status || "Pending";
                const cfg = statusConfig[status] || statusConfig.Pending;
                return (
                  <tr
                    key={booking._id || index}
                    className="hover:bg-gray-50/60 transition-colors group"
                  >
                    {/* Number */}
                    <td className="px-5 py-4 text-xs font-bold text-gray-300">
                      {index + 1}
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {booking.userId?.name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {booking.userId?.email || "—"}
                      </p>
                    </td>

                    {/* Vehicle */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-9 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                          <img
                            src={
                              booking.carId?.image ||
                              booking.carId?.imageUrl ||
                              "https://placehold.co/100x60?text=Car"
                            }
                            alt="car"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {booking.carId?.brand} {booking.carId?.model}
                          </p>
                          <p className="text-xs text-gray-400 font-mono">
                            #{booking._id?.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Period */}
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 px-2.5 py-1.5 rounded-md w-max border border-gray-100 shadow-sm">
                          <span className="text-gray-400 font-medium">
                            from:
                          </span>
                          <span className="font-semibold">
                            {new Date(booking.startDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 px-2.5 py-1.5 rounded-md w-max border border-gray-100 shadow-sm">
                          <span className="text-gray-400 font-medium">
                            to:&nbsp;&nbsp;
                          </span>
                          <span className="font-semibold">
                            {new Date(booking.endDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-gray-900">
                        {currencySymbol}
                        {booking.totalPrice?.toLocaleString()}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <div className="relative inline-flex items-center">
                        <span
                          className={`absolute left-2 w-1.5 h-1.5 rounded-full ${cfg.dot}`}
                        />
                        <select
                          value={status}
                          onChange={(e) =>
                            handleStatusChange(booking._id, e.target.value)
                          }
                          className={`text-xs font-semibold rounded-lg pl-5 pr-3 py-1.5 border outline-none cursor-pointer appearance-none ${cfg.badge}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors inline-flex items-center justify-center"
                        title="Delete Booking"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm font-medium">
                No bookings found.
              </p>
            </div>
          )}
        </div>

        {/* ── MOBILE CARDS ── */}
        <div className="md:hidden space-y-3">
          {bookings.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm font-medium">
                No bookings found.
              </p>
            </div>
          )}
          {bookings.map((booking, index) => {
            const status = booking.status || "Pending";
            const cfg = statusConfig[status] || statusConfig.Pending;
            return (
              <div
                key={booking._id || index}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Card Top: number + car image + name + delete */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>

                  <div className="w-16 h-10 rounded-lg bg-gray-100 overflow-hidden border border-gray-100 shrink-0">
                    <img
                      src={
                        booking.carId?.image ||
                        booking.carId?.imageUrl ||
                        "https://placehold.co/100x60?text=Car"
                      }
                      alt="car"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {booking.carId?.brand} {booking.carId?.model}
                    </p>
                    <p className="text-xs text-gray-400 font-mono">
                      #{booking._id?.slice(-6)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteBooking(booking._id)}
                    className="text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg shrink-0 transition-colors"
                    title="Delete Booking"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>

                {/* Card Body: stacked rows for each detail */}
                <div className="flex flex-col divide-y divide-gray-50">
                  {/* Customer row */}
                  <div className="flex items-center justify-between px-4 py-3 gap-4">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold shrink-0 w-20">
                      Customer
                    </p>
                    <div className="flex-1 min-w-0 text-right">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {booking.userId?.name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {booking.userId?.email || "—"}
                      </p>
                    </div>
                  </div>

                  {/* Period row */}
                  <div className="flex items-center justify-between px-4 py-3 gap-4">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold shrink-0 w-20">
                      Period
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className="text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-100 rounded-md px-2 py-1 whitespace-nowrap">
                        {new Date(booking.startDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-3 h-3 text-gray-300 shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                      </svg>
                      <span className="text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-100 rounded-md px-2 py-1 whitespace-nowrap">
                        {new Date(booking.endDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Amount row */}
                  <div className="flex items-center justify-between px-4 py-3 gap-4">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold shrink-0 w-20">
                      Amount
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      <span className="text-gray-500 font-semibold">
                        {currencySymbol}
                      </span>
                      {booking.totalPrice?.toLocaleString()}
                    </p>
                  </div>

                  {/* Status row */}
                  <div className="flex items-center justify-between px-4 py-3 gap-4">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold shrink-0 w-20">
                      Status
                    </p>
                    <div className="relative inline-flex items-center">
                      <span
                        className={`absolute left-2 w-1.5 h-1.5 rounded-full ${cfg.dot}`}
                      />
                      <select
                        value={status}
                        onChange={(e) =>
                          handleStatusChange(booking._id, e.target.value)
                        }
                        className={`text-xs font-semibold rounded-lg pl-5 pr-3 py-1.5 border outline-none cursor-pointer appearance-none ${cfg.badge}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
