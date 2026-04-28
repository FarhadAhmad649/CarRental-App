import React, { useContext, useState } from "react";
import { assets, dummyMyBookingsData } from "../assets/assets";
import { AppContext } from "../context/AppContext";

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
  Completed: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    dot: "bg-blue-400",
    border: "border-blue-200",
  },
};

// .............. Card for a booking........................

function BookingCard({ booking, index, currencySymbol }) {
  const [hovered, setHovered] = useState(false);
  const status = booking.status || "Pending";
  const statusStyle = statusConfig[status] || statusConfig.Pending;

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
      {/* Top accent line */}
      <div className="absolute right-0 left-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex flex-col md:flex-row">
        {/* Car Image */}
        <div className="relative md:w-52 h-30 md:h-auto shrink-0 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={booking.car?.image || booking.car}
            alt={`${booking.car?.brand} ${booking.car?.model}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row flex-1 p-5 gap-5">
          {/* Car Info + Booking Details */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Car Name & Meta */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 tracking-tight">
                {booking.car?.brand} {booking.car?.model}
              </h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {[
                  booking.car?.year,
                  booking.car?.category,
                  booking.car?.location,
                ]
                  .filter(Boolean)
                  .map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>

            {/* Booking ID + Status */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-100 rounded-md px-2.5 py-1">
                Booking #{String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-md px-2.5 py-1 border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot} animate-pulse`}
                />
                {status}
              </span>
            </div>

            {/* Rental Period */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                <img
                  src={assets.calendar_icon_colored}
                  alt=""
                  className="w-4 h-4"
                />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                  Rental Period
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {booking.pickupDate}{" "}
                  <img className="w-3 inline" src={assets.arrow_icon} alt="" />{" "}
                  {booking.returnDate}
                </p>
              </div>
            </div>

            {/* Pickup Location */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center shrink-0 mt-0.5">
                <img src={assets.location_icon} alt="" className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                  Pick-up Location
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {booking.car?.location}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-100 self-stretch" />

          {/* Price Block */}
          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 md:min-w-[120px] pt-4 md:pt-0 border-t border-gray-100 md:border-0">
            <div className="text-center md:text-right">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Total Price
              </p>
              <p className="text-xl font-bold text-gray-900 tracking-tight">
                <span className="text-base font-semibold text-gray-500">
                  {currencySymbol}
                </span>
                {booking.price}
              </p>
            </div>
            <p className="text-[11px] text-gray-400 md:text-center">
              Booked:{" "}
              <span className="text-gray-500 font-medium">
                {booking.pickupDate}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyBookings() {
  const { currencySymbol } = useContext(AppContext);

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
            {dummyMyBookingsData.map((booking, index) => (
              <BookingCard
                key={index}
                booking={booking}
                index={index}
                currencySymbol={currencySymbol}
              />
            ))}
          </div>

          {/* Empty State */}
          {dummyMyBookingsData.length === 0 && (
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
