import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, DollarSign } from "lucide-react";

const RevenueList = ({ token }) => {
  const { backendUrl, currencySymbol } = useContext(AppContext);
  const navigate = useNavigate();
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        if (!token) return;
        const response = await axios.get(
          `${backendUrl}/api/bookings/admin/revenue-details`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (response.data.success && response.data.revenue) {
          const formatted = response.data.revenue.map((db) => ({
            _id: db._id,
            userName: db.userId?.name || "Unknown",
            userEmail: db.userId?.email || "No email",
            carBrand: db.carId?.brand || "Unknown",
            carModel: db.carId?.model || "Car",
            date: db.createdAt || db.startDate,
            amount: Number(db.totalPrice || db.price || db.amount || 0),
            status: db.status,
          }));
          setRevenueData(formatted);
        }
      } catch (error) {
        console.error("Revenue Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRevenueData();
  }, [token, backendUrl]);

  const totalSum = revenueData.reduce((sum, item) => sum + item.amount, 0);

  const statusConfig = {
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">
            Loading revenue data…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-5 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 hover:text-gray-700 mb-4 transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Back to Dashboard
        </button>

        {/* Header row: title + total card */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 sm:mb-8">
          {/* Title */}
          <div className="flex items-center gap-2.5">
            <div className="h-6 sm:h-7 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-400" />
            <div>
              <h2 className="text-base sm:text-xl font-bold text-gray-800 tracking-tight">
                Revenue Details
              </h2>
              <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                All completed and confirmed transactions
              </p>
            </div>
          </div>

          {/* Total card */}
          <div className="flex items-center gap-3 bg-white border border-emerald-100 px-4 py-3 rounded-2xl shadow-sm shadow-emerald-50 self-start sm:self-auto">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 ring-2 ring-emerald-100 flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-widest leading-none">
                Total Captured
              </p>
              <p className="text-lg sm:text-2xl font-extrabold text-gray-900 leading-tight mt-0.5">
                {currencySymbol}
                {totalSum.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* ── DESKTOP TABLE ── */}
        <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-widest text-gray-400 font-semibold">
                <th className="px-5 py-3.5 w-8">#</th>
                <th className="px-5 py-3.5">Transaction ID</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Vehicle</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {revenueData.map((tx, index) => (
                <tr
                  key={tx._id || index}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <td className="px-5 py-4 text-xs font-bold text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-gray-400">
                    #{tx._id?.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-gray-800">
                      {tx.userName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {tx.userEmail}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-700">
                      {tx.carBrand} {tx.carModel}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full border ${statusConfig[tx.status] || "bg-gray-50 text-gray-600 border-gray-200"}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <p className="text-sm font-bold text-emerald-600">
                      +{currencySymbol}
                      {tx.amount.toLocaleString()}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {revenueData.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm font-medium">
                No revenue data available yet.
              </p>
            </div>
          )}
        </div>

        {/* ── MOBILE CARDS ── */}
        <div className="md:hidden space-y-3">
          {revenueData.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm font-medium">
                No revenue data available yet.
              </p>
            </div>
          )}
          {revenueData.map((tx, index) => (
            <div
              key={tx._id || index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Card top: number + customer + amount */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-50">
                <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 text-xs font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {tx.userName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {tx.userEmail}
                  </p>
                </div>
                <p className="text-sm font-bold text-emerald-600 shrink-0">
                  +{currencySymbol}
                  {tx.amount.toLocaleString()}
                </p>
              </div>

              {/* Card bottom: vehicle + tx id + status */}
              <div className="grid grid-cols-3 px-1">
                <div className="px-3 py-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                    Vehicle
                  </p>
                  <p className="text-xs font-medium text-gray-700">
                    {tx.carBrand} {tx.carModel}
                  </p>
                </div>
                <div className="px-3 py-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                    Txn ID
                  </p>
                  <p className="text-xs font-mono text-gray-400">
                    #{tx._id?.slice(-6).toUpperCase()}
                  </p>
                </div>
                <div className="px-3 py-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                    Status
                  </p>
                  <span
                    className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusConfig[tx.status] || "bg-gray-50 text-gray-600 border-gray-200"}`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueList;
