import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "PKR";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false,
  );
  const [reviews, setReviews] = useState([]);
  const [cars, setCars] = useState([]);
  const [userData, setUserData] = useState(false);

  // 1. Fetch all the cars from db
  const fetchCars = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/car/list");

      if (Array.isArray(data)) {
        setCars(data);
      }
      // Fallback: If it sends an object with a success message
      else if (data.success) {
        setCars(data.cars || data.data || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching cars", error);
      toast.error("Failed to load cars from database");
    }
  };

  // 2. Fetch user data
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

  // 3. Fetch user reviews
  const fetchReviews = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/reviews");
      if (data.success) {
        const formattedReviews = data.reviews.map((rev) => ({
          name: rev.userId?.name,
          image: rev.userId?.image,
          location: rev.userId?.location,
          rating: rev.rating,
          comment: rev.comment,
          date: new Date(rev.createdAt).toLocaleDateString(),
        }));
        setReviews(formattedReviews);
      }
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  // Runs once on mount — no token required for public car listing
  useEffect(() => {
    fetchCars();
  }, []);

  // Runs when token changes — protected routes only
  useEffect(() => {
    if (token) {
      fetchReviews();
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
    loadUserProfileData,
    fetchReviews,
    fetchCars,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
