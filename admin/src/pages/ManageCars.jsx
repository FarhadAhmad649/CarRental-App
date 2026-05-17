import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Pencil, Trash2, Check, X, ImagePlus } from "lucide-react";

const ManageCars = ({ token }) => {
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [newImage, setNewImage] = useState(false);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/car/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success || response.status === 200) {
        setList(response.data.cars || response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch cars");
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditData({ ...item });
    setNewImage(false);
  };

  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("brand", editData.brand);
      formData.append("model", editData.model);
      formData.append("category", editData.category);
      formData.append("price", editData.price);
      if (newImage) formData.append("image", newImage);

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

  const removeCar = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/car/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        toast.success("Car removed");
        fetchList();
      }
    } catch (error) {
      toast.error("Failed to remove car");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const categories = [
    "Sedan",
    "SUV",
    "Luxury",
    "Hatchback",
    "Convertible",
    "Truck",
  ];

  return (
    <div className="p-3 sm:p-5 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
        <div className="h-6 sm:h-7 w-1 rounded-full bg-gradient-to-b from-blue-500 to-violet-500" />
        <p className="text-base sm:text-xl font-bold text-gray-800 tracking-tight">
          Manage Inventory
        </p>
        <span className="ml-auto text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
          {list.length} cars
        </span>
      </div>

      {/* ── DESKTOP TABLE ── */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-widest text-gray-400 font-semibold">
              <th className="px-5 py-3.5 w-8">#</th>
              <th className="px-5 py-3.5">Image</th>
              <th className="px-5 py-3.5">Brand / Model</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Price / Day</th>
              <th className="px-5 py-3.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {list.map((item, index) => {
              const isEditing = editingId === item._id;
              return (
                <tr
                  key={item._id || index}
                  className={`transition-colors ${isEditing ? "bg-blue-50/60" : "hover:bg-gray-50/60"}`}
                >
                  {/* Number */}
                  <td className="px-5 py-4 text-xs font-bold text-gray-300">
                    {index + 1}
                  </td>

                  {/* Image */}
                  <td className="px-5 py-4">
                    <div className="relative w-16 h-11 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                      <label
                        htmlFor={isEditing ? `img-${item._id}` : undefined}
                        className={isEditing ? "cursor-pointer" : ""}
                      >
                        <img
                          src={
                            newImage && isEditing
                              ? URL.createObjectURL(newImage)
                              : item.image
                          }
                          alt={`${item.brand} ${item.model}`}
                          className="w-full h-full object-cover"
                        />
                        {isEditing && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <ImagePlus className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </label>
                      <input
                        type="file"
                        id={`img-${item._id}`}
                        hidden
                        onChange={(e) => setNewImage(e.target.files[0])}
                      />
                    </div>
                  </td>

                  {/* Brand / Model */}
                  <td className="px-5 py-4">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          className="border border-gray-200 bg-white px-2.5 py-1.5 rounded-lg text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          value={editData.brand}
                          placeholder="Brand"
                          onChange={(e) =>
                            setEditData({ ...editData, brand: e.target.value })
                          }
                        />
                        <input
                          className="border border-gray-200 bg-white px-2.5 py-1.5 rounded-lg text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          value={editData.model}
                          placeholder="Model"
                          onChange={(e) =>
                            setEditData({ ...editData, model: e.target.value })
                          }
                        />
                      </div>
                    ) : (
                      <p className="text-sm font-semibold text-gray-800">
                        {item.brand} {item.model}
                      </p>
                    )}
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    {isEditing ? (
                      <select
                        className="border border-gray-200 bg-white px-2.5 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={editData.category}
                        onChange={(e) =>
                          setEditData({ ...editData, category: e.target.value })
                        }
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="inline-flex text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                        {item.category}
                      </span>
                    )}
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-500">
                          {currency}
                        </span>
                        <input
                          type="number"
                          className="border border-gray-200 bg-white px-2.5 py-1.5 rounded-lg text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-200"
                          value={editData.price}
                          onChange={(e) =>
                            setEditData({ ...editData, price: e.target.value })
                          }
                        />
                      </div>
                    ) : (
                      <p className="text-sm font-bold text-emerald-600">
                        {currency}
                        {item.price}
                      </p>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleUpdate(item._id)}
                            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" /> Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" /> Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(item)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => removeCar(item._id)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {list.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm font-medium">
              No cars in inventory.
            </p>
          </div>
        )}
      </div>

      {/* ── MOBILE CARDS ── */}
      <div className="md:hidden space-y-3">
        {list.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm font-medium">
              No cars in inventory.
            </p>
          </div>
        )}
        {list.map((item, index) => {
          const isEditing = editingId === item._id;
          return (
            <div
              key={item._id || index}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-colors ${
                isEditing ? "border-blue-200 bg-blue-50/30" : "border-gray-100"
              }`}
            >
              {/* Card top: number + image + name */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                {/* Row number */}
                <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 text-xs font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </span>

                {/* Image */}
                <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                  <label
                    htmlFor={isEditing ? `mob-img-${item._id}` : undefined}
                    className={isEditing ? "cursor-pointer" : ""}
                  >
                    <img
                      src={
                        newImage && isEditing
                          ? URL.createObjectURL(newImage)
                          : item.image
                      }
                      alt={`${item.brand} ${item.model}`}
                      className="w-full h-full object-cover"
                    />
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <ImagePlus className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    id={`mob-img-${item._id}`}
                    hidden
                    onChange={(e) => setNewImage(e.target.files[0])}
                  />
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <div className="flex gap-1.5">
                      <input
                        className="border border-gray-200 bg-white px-2 py-1 rounded-lg text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={editData.brand}
                        placeholder="Brand"
                        onChange={(e) =>
                          setEditData({ ...editData, brand: e.target.value })
                        }
                      />
                      <input
                        className="border border-gray-200 bg-white px-2 py-1 rounded-lg text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={editData.model}
                        placeholder="Model"
                        onChange={(e) =>
                          setEditData({ ...editData, model: e.target.value })
                        }
                      />
                    </div>
                  ) : (
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {item.brand} {item.model}
                    </p>
                  )}
                </div>
              </div>

              {/* Card body: stacked rows for category + price */}
              <div className="flex flex-col divide-y divide-gray-50">
                {/* Category row */}
                <div className="flex items-center justify-between px-4 py-3 gap-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold shrink-0 w-20">
                    Category
                  </p>
                  {isEditing ? (
                    <select
                      className="border border-gray-200 bg-white px-2.5 py-1.5 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={editData.category}
                      onChange={(e) =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="inline-flex text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                      {item.category}
                    </span>
                  )}
                </div>

                {/* Price row */}
                <div className="flex items-center justify-between px-4 py-3 gap-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold shrink-0 w-20">
                    Price / Day
                  </p>
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400">{currency}</span>
                      <input
                        type="number"
                        className="border border-gray-200 bg-white px-2.5 py-1.5 rounded-lg text-xs w-24 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={editData.price}
                        onChange={(e) =>
                          setEditData({ ...editData, price: e.target.value })
                        }
                      />
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-emerald-600">
                      {currency}
                      {item.price}
                    </p>
                  )}
                </div>

                {/* Actions row */}
                <div className="flex items-center justify-end px-4 py-3 gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleUpdate(item._id)}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" /> Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(item)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 text-blue-500 hover:bg-blue-100 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeCar(item._id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 text-red-400 hover:bg-red-100 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageCars;
