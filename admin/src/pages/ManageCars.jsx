import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const ManageCars = ({ token }) => {
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [newImage, setNewImage] = useState(false); // Holds the new file

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/car/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success || response.status === 200) {
        setList(response.data.cars || response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch cars");
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditData({ ...item });
    setNewImage(false); // Reset image state
  };

  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("brand", editData.brand);
      formData.append("model", editData.model);
      formData.append("category", editData.category);
      formData.append("price", editData.price);

      // Only append image if a new one was selected
      if (newImage) {
        formData.append("image", newImage);
      }

      const response = await axios.post(
        `${backendUrl}/api/car/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        toast.success("Car updated successfully");
        setEditingId(null);
        setNewImage(false);
        fetchList();
      }
    } catch (error) {
      toast.error("Failed to update car details");
    }
  };

  // ... (keep removeCar logic) ...

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <>
      <p className="mb-4 text-xl font-bold">Manage Inventory</p>

      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-semibold text-gray-600">
          <b>Image</b>
          <b>Name/Model</b>
          <b>Category</b>
          <b>Price Per Day</b>
          <b className="text-center">Actions</b>
        </div>

        {list.map((item, index) => (
          <div
            className={`grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center gap-4 py-3 px-4 border text-sm transition-all ${editingId === item._id ? "bg-blue-50 border-blue-200" : "bg-white"}`}
            key={item._id || index}
          >
            {/* Image Upload Logic */}
            <div className="relative w-16 h-12">
              <label htmlFor={editingId === item._id ? "update-image" : ""}>
                <img
                  className={`w-16 h-12 object-cover rounded shadow-sm ${
                    editingId === item._id
                      ? "cursor-pointer border-2 border-blue-400 opacity-80"
                      : ""
                  }`}
                  src={
                    newImage && editingId === item._id
                      ? URL.createObjectURL(newImage)
                      : item.image
                  }
                  alt=""
                />
                {editingId === item._id && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-[8px] bg-black/50 text-white px-1 rounded">
                      Change
                    </p>
                  </div>
                )}
              </label>
              <input
                type="file"
                id="update-image"
                hidden
                onChange={(e) => setNewImage(e.target.files[0])}
              />
            </div>

            {/* Editable Name Field */}
            {editingId === item._id ? (
              <div className="flex gap-1">
                <input
                  className="border px-2 py-1 rounded w-full"
                  value={editData.brand}
                  onChange={(e) =>
                    setEditData({ ...editData, brand: e.target.value })
                  }
                />
                <input
                  className="border px-2 py-1 rounded w-full"
                  value={editData.model}
                  onChange={(e) =>
                    setEditData({ ...editData, model: e.target.value })
                  }
                />
              </div>
            ) : (
              <p className="font-medium">
                {item.brand} {item.model}
              </p>
            )}

            {/* Editable Category Field */}
            {editingId === item._id ? (
              <select
                className="border px-2 py-1 rounded"
                value={editData.category}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
              </select>
            ) : (
              <p className="text-gray-600">{item.category}</p>
            )}

            {/* Editable Price Field */}
            {editingId === item._id ? (
              <div className="flex items-center">
                <span>{currency}</span>
                <input
                  type="number"
                  className="border px-2 py-1 rounded w-20 ml-1"
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({ ...editData, price: e.target.value })
                  }
                />
              </div>
            ) : (
              <p className="font-semibold text-emerald-600">
                {currency}
                {item.price}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              {editingId === item._id ? (
                <>
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="text-emerald-600 font-bold hover:underline cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-500 hover:underline cursor-pointer"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(item)}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeCar(item._id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManageCars;
