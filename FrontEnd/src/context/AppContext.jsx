import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { dummyReviewsData, dummyCarData } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "PKR";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false,
  );

  const [cars, setCars] = useState(dummyCarData);
  // const [dashboardData, setDashboardData] = useState(dummyDashboardData);
  // const [myBookings, setMyBookings] = useState(dummyMyBookingsData);
  //const [userData, setUserData] = useState(dummyUserData);
  const [reviews, setReviews] = useState(dummyReviewsData);
  // Inside AppContext.jsx

  const [userData, setUserData] = useState(false);

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/users/get-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.userData);
        console.log("User Data Loaded:", data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  // --- 2. Run the fetcher whenever the token changes ---
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);


  const value = {
    currencySymbol,
    token,
    setToken,
    backendUrl,
    cars,
    setCars,
    reviews,
    setReviews,
    userData,
    setUserData,
    loadUserProfileData
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};;;

export default AppContextProvider;
