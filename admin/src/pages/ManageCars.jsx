import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App"; 
import { toast } from "react-toastify";

const ManageCars = ({ token }) => {
  const [list, setList] = useState([]);

  // 1. Fetch all cars from the database
  const fetchList = async () => {
    try {
      // NOTE: Make sure this URL matches your backend route for listing cars!
      const response = await axios.get(`${backendUrl}/api/car/list`, {
        headers: { Authorization: `Bearer ${token}` }, // Optional: if your route requires admin token
      });

      if (response.data.success || response.status === 200) {
        // Assuming your backend sends the array of cars inside response.data.cars
        setList(response.data.cars || response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch cars");
    }
  };

  // 2. Delete a car
  const removeCar = async (id) => {
    try {
      // NOTE: Make sure this URL matches your backend route for deleting cars!
      const response = await axios.post(
        `${backendUrl}/api/car/remove`,
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success || response.status === 200) {
        toast.success("Car removed successfully");
        fetchList(); // Refresh the list automatically
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to remove car");
    }
  };

  // Run fetchList exactly once when the page loads
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-4 text-xl font-bold">All Cars List</p>

      <div className="flex flex-col gap-2">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* List of Cars */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center gap-4 py-2 px-4 border text-sm"
            key={index}
          >
            {/* Displaying the Cloudinary image URL */}
            <img
              className="w-16 h-16 object-cover rounded"
              src={item.image}
              alt={item.model}
            />

            <p className="font-medium text-gray-800">
              {item.brand} {item.model}
            </p>
            <p className="text-gray-600">{item.category}</p>
            <p className="font-semibold text-green-600">
              {currency}
              {item.price}/day
            </p>

            <button
              onClick={() => removeCar(item._id)}
              className="text-right md:text-center text-red-500 hover:text-red-700 font-medium cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}

        {list.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No cars found. Go add some!
          </p>
        )}
      </div>
    </>
  );
};

export default ManageCars;
