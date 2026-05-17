import { toast } from "react-toastify";
import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import WriteReview from "../compnents/WriteReview";

// ............... status for bookings
const statusConfig = {
  Pending: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-400",
    border: "border-amber-200",
  },
  Confirmed: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    dot: "bg-emerald-400",
    border: "border-emerald-200",
  },
  Cancelled: {
    bg: "bg-red-50",
    text: "text-red-500",
    dot: "bg-red-400",
    border: "border-red-200",
  },
};

// .............. Card for a booking........................

function BookingCard({ booking, index, currencySymbol, onReviewClick }) {
  const [hovered, setHovered] = useState(false);
  
  // Failsafe in case a booking object is empty
  if (!booking) return null;

  const status = booking.status || "Pending";
  const statusStyle = statusConfig[status] || statusConfig.Pending;

  // Helper function to format dates nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:shadow-gray-100 hover:-translate-y-1"
      style={{
        animationDelay: `${index * 80}ms`,
        animation: "fadeSlideUp 0.5s ease-out both",
      }}
    >
      <div className="absolute right-0 left-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col md:flex-row">
        {/* Car Image (Updated to use carId) */}
        <div className="relative md:w-52 h-48 md:h-auto shrink-0 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={booking.carId?.image}
            alt={`${booking.carId?.brand} ${booking.carId?.model}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col md:flex-row flex-1 p-5 gap-5">
          {/* REBUILT: Car Info + Booking Details */}
          <div className="flex-1 flex flex-col gap-4">
            
            {/* Header: Title and Status Badge */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                  {booking.carId?.brand} {booking.carId?.model}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                  {booking.carId?.year} • {booking.carId?.category}
                </p>
              </div>
              
              {/* Status Badge */}
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${statusStyle.bg} ${statusStyle.border} shrink-0`}>
                <div className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                <span className={`text-[11px] font-semibold uppercase tracking-wide ${statusStyle.text}`}>
                  {status}
                </span>
              </div>
            </div>

            {/* Tags (Transmission, Fuel, Seats) */}
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md border border-gray-100">
                {booking.carId?.transmission}
              </span>
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md border border-gray-100">
                {booking.carId?.fuel_type}
              </span>
              <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md border border-gray-100">
                {booking.carId?.seating_capacity} Seats
              </span>
            </div>

            {/* Dates and Location Grid */}
            <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-50">
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Rental Period
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {formatDate(booking.startDate)} — {formatDate(booking.endDate)}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Pick-up Location
                </p>
                <p className="text-sm font-medium text-gray-700 truncate">
                  {booking.carId?.location}
                </p>
              </div>
            </div>

          </div>

          {/* Divider line for desktop */}
          <div className="hidden md:block w-px bg-gray-100 self-stretch" />

          {/* Price Block & Action Button (Updated to use totalPrice) */}
          <div className="flex flex-col items-center md:items-end justify-between md:justify-center gap-3 md:min-w-[120px] pt-4 md:pt-0 border-t border-gray-100 md:border-0">
            <div className="text-center md:text-right w-full flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end">
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Total Price
                </p>
                <p className="text-xl font-bold text-gray-900 tracking-tight">
                  <span className="text-base font-semibold text-gray-500 mr-1">
                    {currencySymbol}
                  </span>
                  {booking.totalPrice?.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Review Button */}
            {status === "Completed" ? (
               <button
                 onClick={onReviewClick}
                 className="w-full md:w-auto px-4 py-2 mt-2 bg-white border border-gray-200 text-gray-700 font-medium text-xs rounded-lg hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
               >
                 Leave Review
               </button>
            ) : null}
            
          </div>
        </div>
      </div>
    </div>
  );
}

function MyBookings() {
  const { currencySymbol, token, backendUrl } = useContext(AppContext);
  const [bookingsData, setBookingsData] = useState([]);

  // ADD THIS: State to manage the review modal
  const [selectedBooking, setSelectedBooking] = useState(null);

  const reviewSectionRef = useRef(null);

  // 3. Add this useEffect to listen for when a user clicks the button
  useEffect(() => {
    // If a booking is selected and the ref exists on the screen
    if (selectedBooking && reviewSectionRef.current) {
      // Use a tiny timeout to ensure React has fully rendered the form first
      setTimeout(() => {
        reviewSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center", // This centers the form on the screen
        });
      }, 100);
    }
  }, [selectedBooking]);

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/bookings/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("API Response:", response.data);
  
      // FIX: Since response.data IS the array, we check if it's an array and set it directly
      if (Array.isArray(response.data)) {
        setBookingsData(response.data);
      } else {
        // Failsafe in case the backend returns something unexpected
        setBookingsData([]); 
      }
  
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, [token, backendUrl]);

  return (
    <>
      <style>{/* ... Keep your existing styles ... */}</style>

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
            {bookingsData.map((booking, index) => (
              <BookingCard
                key={index}
                booking={booking}
                index={index}
                currencySymbol={currencySymbol}
                // ADD THIS: Pass the state setter down as a prop
                onReviewClick={() => setSelectedBooking(booking)}
              />
            ))}
          </div>

          {/* Empty State ... */}
        </div>
      </div>

      {/* ADD THIS: Render the review modal if a booking is selected */}
      <div ref={reviewSectionRef}>
        {selectedBooking && (
          <WriteReview
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </div>
    </>
  );
}

export default MyBookings;
