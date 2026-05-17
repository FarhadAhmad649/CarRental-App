import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { backendUrl } from "../App";
import {
  DollarSign,
  CalendarCheck,
  Car,
  CheckCircle2,
  Clock,
  BadgeCheck,
  XCircle,
} from "lucide-react";

export const Dashboard = ({ token }) => {
  const { currencySymbol } = useContext(AppContext);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        if (!token) return;
        const response = await axios.get(
          `${backendUrl}/api/bookings/admin/dashboard-stats`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (response.data.success) setStats(response.data.stats);
      } catch (error) {
        console.error("Stats Fetch Error:", error);
      }
    };
    fetchDashboardStats();
  }, [token]);

  const {
    totalCars = 0,
    totalBookings = 0,
    completed = 0,
    pending = 0,
    confirmed = 0,
    cancelled = 0,
    totalRevenue = 0,
  } = stats || {};

  const topCards = [
    {
      label: "Total Revenue",
      value: `${currencySymbol}${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      gradient: "from-emerald-500 to-teal-400",
      bg: "bg-emerald-50",
      ring: "ring-emerald-100",
      text: "text-emerald-600",
      glow: "shadow-emerald-100",
      link: "/admin/revenue",
    },
    {
      label: "Total Cars",
      value: totalCars,
      icon: Car,
      gradient: "from-violet-500 to-purple-400",
      bg: "bg-violet-50",
      ring: "ring-violet-100",
      text: "text-violet-600",
      glow: "shadow-violet-100",
      link: "/list",
    },
  ];

  const bottomCards = [
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: CalendarCheck,
      gradient: "from-blue-500 to-sky-400",
      bg: "bg-blue-50",
      ring: "ring-blue-100",
      text: "text-blue-600",
      glow: "shadow-blue-100",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      gradient: "from-green-500 to-lime-400",
      bg: "bg-green-50",
      ring: "ring-green-100",
      text: "text-green-600",
      glow: "shadow-green-100",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      gradient: "from-amber-500 to-yellow-400",
      bg: "bg-amber-50",
      ring: "ring-amber-100",
      text: "text-amber-600",
      glow: "shadow-amber-100",
    },
    {
      label: "Confirmed",
      value: confirmed,
      icon: BadgeCheck,
      gradient: "from-indigo-500 to-blue-400",
      bg: "bg-indigo-50",
      ring: "ring-indigo-100",
      text: "text-indigo-600",
      glow: "shadow-indigo-100",
    },
    {
      label: "Cancelled",
      value: cancelled,
      icon: XCircle,
      gradient: "from-rose-500 to-red-400",
      bg: "bg-rose-50",
      ring: "ring-rose-100",
      text: "text-rose-600",
      glow: "shadow-rose-100",
    },
  ];

  const StatCard = ({ card, large = false }) => {
    const Icon = card.icon;
    return (
      <div
        onClick={card.link ? () => navigate(card.link) : undefined}
        className={`
          group relative bg-white rounded-2xl border border-gray-100
          ${large ? "p-4 sm:p-5 md:p-6" : "p-3.5 sm:p-4 md:p-5"}
          flex flex-col gap-2
          shadow-sm ${card.glow}
          hover:shadow-md hover:-translate-y-0.5
          transition-all duration-200 ease-out
          overflow-hidden
          ${card.link ? "cursor-pointer active:scale-[0.98]" : "cursor-default"}
        `}
      >
        {/* Top accent line */}
        <div
          className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.gradient} opacity-70`}
        />

        {/* Icon row */}
        <div className="flex items-center justify-between">
          <div
            className={`
              ${large ? "w-10 h-10" : "w-8 h-8 sm:w-9 sm:h-9"}
              rounded-xl flex items-center justify-center shrink-0
              ${card.bg} ring-2 ${card.ring}
              group-hover:scale-105 transition-transform duration-200
            `}
          >
            <Icon
              className={`${large ? "w-5 h-5" : "w-4 h-4"} ${card.text}`}
              strokeWidth={2}
            />
          </div>

          {/* "View →" pill — desktop only, only for linked cards */}
          {card.link && (
            <span
              className={`
                hidden sm:inline-flex items-center
                text-xs font-bold px-2.5 py-1 rounded-full
                ${card.bg} ${card.text}
                group-hover:opacity-80 transition-opacity
              `}
            >
              View →
            </span>
          )}
        </div>

        {/* Label */}
        <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest leading-none">
          {card.label}
        </p>

        {/* Value + mobile arrow */}
        <div className="flex items-end justify-between gap-1">
          <p
            className={`
              ${large ? "text-xl sm:text-2xl md:text-3xl" : "text-lg sm:text-xl md:text-2xl"}
              font-extrabold text-gray-900 leading-none tracking-tight
            `}
          >
            {card.value}
          </p>

          {/* Small arrow on mobile for linked cards */}
          {card.link && (
            <span className={`sm:hidden text-sm font-bold ${card.text} mb-0.5`}>
              →
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-3 sm:p-5 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4 sm:mb-6">
        <div className="h-6 sm:h-7 w-1 rounded-full bg-gradient-to-b from-blue-500 to-violet-500" />
        <p className="text-base sm:text-xl font-bold text-gray-800 tracking-tight">
          Dashboard
        </p>
      </div>

      {/* Row 1 — Revenue & Total Cars: always 2 cols */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-3 sm:mb-4">
        {topCards.map((card, index) => (
          <StatCard key={index} card={card} large />
        ))}
      </div>

      {/* Row 2 — Status cards
          xs/mobile : 2 cols  (wraps as 2+3 or 2+2+1)
          sm        : 3 cols
          lg        : 5 cols  (all one row)
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {bottomCards.map((card, index) => (
          <StatCard key={index} card={card} />
        ))}
      </div>
    </div>
  );
};
