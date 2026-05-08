import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // NOTE: Make sure this URL matches your backend route for admin login!
      // It might be '/api/user/admin_login' or just '/api/user/login'
      const response = await axios.post(`${backendUrl}/api/users/admin_login`, {
        email,
        password,
      });

      // If the backend sends back a token, save it and unlock the app
      if (response.data.success || response.status === 200) {
        setToken(response.data.token);
        toast.success("Welcome to the Admin Dashboard!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl px-8 py-8 max-w-md w-full border border-gray-100">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#5f6fff] tracking-tight mb-2">
            Admin Access
          </h1>
          <p className="text-sm text-gray-500">
            Sign in to manage your car fleet
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-lg w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              type="email"
              placeholder="admin@bitecheck.com"
              required
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-lg w-full px-4 py-3 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-3 px-4 rounded-lg text-white font-medium bg-[#5f6fff] hover:bg-[#1f58d8] transition-colors shadow-sm"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
