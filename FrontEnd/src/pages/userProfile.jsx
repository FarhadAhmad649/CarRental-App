import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { userData, setUserData, token, backendUrl } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "",
    dob: "",
  });

  // ✅ Sync formData whenever userData changes (initial load + after save)
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        phone: userData.phone || "",
        gender: userData.gender || "",
        dob: userData.dob || "",
      });
    }
  }, [userData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateUserProfileData = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name || "User"); // ✅ Added default value for name
      form.append("phone", formData.phone || "0000000000");
      form.append("gender", formData.gender || "Male");
      form.append("dob", formData.dob || "2000-01-01");
      if (image) form.append("image", image);

      const { data } = await axios.post(
        `${backendUrl}/api/users/update-profile`,
        form,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success(data.message);
        setUserData(data.userData); // ✅ triggers useEffect above to re-sync formData
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-lg flex flex-col gap-4 text-sm pt-5 px-4 sm:px-[5vw]">
      {/* Profile Image */}
      <div className="flex items-center gap-4">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer">
            <img
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-100"
              src={
                image
                  ? URL.createObjectURL(image)
                  : userData.image || assets.profile_pic
              }
              alt="Profile"
            />
            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            className="w-36 h-36 rounded-full object-cover border-4 border-gray-100"
            src={userData.image || assets.profile_pic}
            alt="Profile"
          />
        )}
      </div>

      {/* Name */}
      {isEdit ? (
        <input
          className="text-3xl font-medium max-w-60 mt-4 px-2 outline-none border-b-2 border-blue-500"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      {/* Contact */}
      <div className="space-y-3">
        <p className="text-neutral-500 underline uppercase tracking-wider">
          Contact Information
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3">
          <p className="font-medium">Email:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52 px-2 py-1 rounded outline-none"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          ) : (
            <p className="text-blue-400 font-semibold">
              {userData.phone || "Add Phone Number"}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="space-y-3">
        <p className="text-neutral-500 underline uppercase tracking-wider">
          Basic Information
        </p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-3">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-28 bg-gray-100 px-2 py-1 rounded"
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p>{userData.gender || "Not Specified"}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              className="max-w-32 bg-gray-100 px-2 py-1 rounded"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          ) : (
            <p>{userData.dob || "Add Birthday"}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        {isEdit ? (
          <>
            <button
              className="bg-blue-600 text-white px-10 py-2.5 rounded-full"
              onClick={updateUserProfileData}
            >
              Save Changes
            </button>
            <button
              className="border px-10 py-2.5 rounded-full"
              onClick={() => {
                setFormData({
                  name: userData.name || "",
                  phone: userData.phone || "",
                  gender: userData.gender || "",
                  dob: userData.dob || "",
                });
                setImage(null);
                setIsEdit(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="border-2 border-blue-600 text-blue-600 px-10 py-2 rounded-full"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
