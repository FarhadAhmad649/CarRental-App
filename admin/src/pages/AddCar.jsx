import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const AddCar = ({ token }) => {
  const [image, setImage] = useState(false);
  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    price: "",
    year: "",
    category: "Sedan",
    seating_capacity: "",
    fuel_type: "Petrol",
    transmission: "Automatic",
    location: "",
    description: "",
    isAvailable: true,
  });

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setCarData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      Object.keys(carData).forEach((key) => {
        formData.append(key, carData[key]);
      });

      const response = await axios.post(`${backendUrl}/api/car/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        toast.success("Car added successfully!");
        setCarData({
          brand: "",
          model: "",
          price: "",
          year: "",
          category: "Sedan",
          seating_capacity: "",
          fuel_type: "Petrol",
          transmission: "Automatic",
          location: "",
          description: "",
          isAvailable: true,
        });
        setImage(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors placeholder:text-gray-300";
  const labelClass =
    "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

  return (
    <div className="bg-gray-50 p-4 sm:p-6 md:p-8 pb-24 sm:pb-8">
      <div className="max-w-2xl mx-auto">
        {/* Page header */}
        <div className="flex items-center gap-2.5 mb-6">
          <div className="h-7 w-1 rounded-full bg-gradient-to-b from-blue-500 to-violet-500" />
          <div>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
              Add New Car
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Expand your fleet by listing a new vehicle
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <form onSubmit={onSubmitHandler}>
            {/* ── Image upload ── */}
            <div className="p-5 sm:p-6 border-b border-gray-50">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Car Photo
              </p>
              <label
                htmlFor="image"
                className="inline-block cursor-pointer group"
              >
                <div className="w-32 h-24 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 group-hover:border-blue-300 group-hover:bg-blue-50/40 flex items-center justify-center overflow-hidden transition-colors">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-gray-400 group-hover:text-blue-400 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                      </svg>
                      <span className="text-[11px] font-medium">
                        Upload photo
                      </span>
                    </div>
                  )}
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                  required
                />
              </label>
            </div>

            {/* ── Basic info ── */}
            <div className="p-5 sm:p-6 border-b border-gray-50">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Basic Info
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Brand</label>
                  <input
                    onChange={onChangeHandler}
                    value={carData.brand}
                    name="brand"
                    className={inputClass}
                    type="text"
                    placeholder="e.g. Toyota"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Model</label>
                  <input
                    onChange={onChangeHandler}
                    value={carData.model}
                    name="model"
                    className={inputClass}
                    type="text"
                    placeholder="e.g. Corolla"
                    required
                  />
                </div>
              </div>
            </div>

            {/* ── Specs ── */}
            <div className="p-5 sm:p-6 border-b border-gray-50">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Specifications
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Price / Day</label>
                  <input
                    onChange={onChangeHandler}
                    value={carData.price}
                    name="price"
                    className={inputClass}
                    type="number"
                    placeholder="25"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Year</label>
                  <input
                    onChange={onChangeHandler}
                    value={carData.year}
                    name="year"
                    className={inputClass}
                    type="number"
                    placeholder="2022"
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>Seats</label>
                  <input
                    onChange={onChangeHandler}
                    value={carData.seating_capacity}
                    name="seating_capacity"
                    className={inputClass}
                    type="number"
                    placeholder="5"
                    required
                  />
                </div>
              </div>
            </div>

            {/* ── Type ── */}
            <div className="p-5 sm:p-6 border-b border-gray-50">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Vehicle Type
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className={labelClass}>Category</label>
                  <select
                    onChange={onChangeHandler}
                    value={carData.category}
                    name="category"
                    className={inputClass}
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Fuel Type</label>
                  <select
                    onChange={onChangeHandler}
                    value={carData.fuel_type}
                    name="fuel_type"
                    className={inputClass}
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Transmission</label>
                  <select
                    onChange={onChangeHandler}
                    value={carData.transmission}
                    name="transmission"
                    className={inputClass}
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ── Location & Description ── */}
            <div className="p-5 sm:p-6 border-b border-gray-50">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Details
              </p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    onChange={onChangeHandler}
                    value={carData.location}
                    name="location"
                    className={inputClass}
                    type="text"
                    placeholder="City or Branch"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    onChange={onChangeHandler}
                    value={carData.description}
                    name="description"
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder="Describe the car — features, condition, extras…"
                    required
                  />
                </div>
              </div>
            </div>

            {/* ── Availability & Submit ── */}
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                <div className="relative">
                  <input
                    onChange={onChangeHandler}
                    checked={carData.isAvailable}
                    name="isAvailable"
                    type="checkbox"
                    id="available"
                    className="sr-only"
                  />
                  <div
                    onClick={() =>
                      setCarData((prev) => ({
                        ...prev,
                        isAvailable: !prev.isAvailable,
                      }))
                    }
                    className={`w-10 h-6 rounded-full transition-colors cursor-pointer ${
                      carData.isAvailable ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        carData.isAvailable ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Currently Available
                  </p>
                  <p className="text-xs text-gray-400">Car is ready to book</p>
                </div>
              </label>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-2.5 bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-sm"
              >
                Add Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
