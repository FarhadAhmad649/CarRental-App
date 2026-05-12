import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App"; // Importing the URL you exported
import { toast } from "react-toastify";

const AddCar = ({ token }) => {
  const [image, setImage] = useState(false);
  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    price: "",
    year: "",
    category: "Sedan", // Default value
    seating_capacity: "",
    fuel_type: "Petrol", // Default value
    transmission: "Automatic", // Default value
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
      // 1. Package the data into FormData (required for image uploads)
      const formData = new FormData();
      formData.append("image", image);

      // Loop through our state and append everything else
      Object.keys(carData).forEach((key) => {
        formData.append(key, carData[key]);
      });

      // 2. Send to backend
      const response = await axios.post(`${backendUrl}/api/car/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token from props
          "Content-Type": "multipart/form-data",
        },
      });

      // 3. Handle success
      if (response.status === 201) {
        toast.success("Car added successfully!");
        // Reset the form
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

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div
        className="w-full flex"
        style={{ animation: "fadeSlideUp 0.4s ease-out both" }}
      >
        <div className="flex flex-col items-center justify-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Add New Car
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Expand your market by adding a new car
          </p>
        </div>
      </div>
      {/* IMAGE UPLOAD SECTION */}
      <div>
        <p className="mb-2">Upload Car Image</p>
        <label htmlFor="image">
          {/* Shows a preview if selected, otherwise a gray box */}
          <div className="w-32 h-32 flex items-center justify-center bg-gray-200 cursor-pointer border-2 border-dashed border-gray-400 rounded">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <span className="text-gray-500 text-sm">Click to upload</span>
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

      <div className="w-full flex flex-col sm:flex-row gap-4 mt-2">
        <div className="flex-1">
          <p className="mb-2">Brand</p>
          <input
            onChange={onChangeHandler}
            value={carData.brand}
            name="brand"
            className="w-full max-w-[500px] px-3 py-2 border rounded"
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="flex-1">
          <p className="mb-2">Model</p>
          <input
            onChange={onChangeHandler}
            value={carData.model}
            name="model"
            className="w-full max-w-[500px] px-3 py-2 border rounded"
            type="text"
            placeholder="Type here"
            required
          />
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <p className="mb-2">Price (per day)</p>
          <input
            onChange={onChangeHandler}
            value={carData.price}
            name="price"
            className="w-full px-3 py-2 border rounded"
            type="number"
            placeholder="25"
            required
          />
        </div>
        <div className="flex-1">
          <p className="mb-2">Year</p>
          <input
            onChange={onChangeHandler}
            value={carData.year}
            name="year"
            className="w-full px-3 py-2 border rounded"
            type="number"
            placeholder="2022"
            required
          />
        </div>
        <div className="flex-1">
          <p className="mb-2">Seats</p>
          <input
            onChange={onChangeHandler}
            value={carData.seating_capacity}
            name="seating_capacity"
            className="w-full px-3 py-2 border rounded"
            type="number"
            placeholder="5"
            required
          />
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <p className="mb-2">Category</p>
          <select
            onChange={onChangeHandler}
            value={carData.category}
            name="category"
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Luxury">Luxury</option>
          </select>
        </div>
        <div className="flex-1">
          <p className="mb-2">Fuel Type</p>
          <select
            onChange={onChangeHandler}
            value={carData.fuel_type}
            name="fuel_type"
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div className="flex-1">
          <p className="mb-2">Transmission</p>
          <select
            onChange={onChangeHandler}
            value={carData.transmission}
            name="transmission"
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Location</p>
        <input
          onChange={onChangeHandler}
          value={carData.location}
          name="location"
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          type="text"
          placeholder="City or Branch"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Car Description</p>
        <textarea
          onChange={onChangeHandler}
          value={carData.description}
          name="description"
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex gap-2 items-center mt-2">
        <input
          onChange={onChangeHandler}
          checked={carData.isAvailable}
          name="isAvailable"
          type="checkbox"
          id="available"
          className="w-4 h-4"
        />
        <label htmlFor="available" className="cursor-pointer">
          Currently Available
        </label>
      </div>

      <button
        type="submit"
        className="w-40 py-3 mt-4 bg-[#5f6fff] text-white rounded text-md cursor-pointer"
      >
        ADD CAR
      </button>
    </form>
  );
};

export default AddCar;
