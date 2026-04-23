import { createContext, useState } from "react";
//import axios from "axios";
//import { toast } from "react-toastify";
import { dummyCarData, dummyDashboardData, dummyMyBookingsData, dummyReviewsData, dummyUserData } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false,
  );

  const [cars, setCars] = useState(dummyCarData);
  // const [dashboardData, setDashboardData] = useState(dummyDashboardData);
  // const [myBookings, setMyBookings] = useState(dummyMyBookingsData);
  // const [userData, setUserData] = useState(dummyUserData);
  const [reviews, setReviews] = useState(dummyReviewsData)

  const value = {
    currencySymbol,
    token,
    setToken,
    backendUrl,
    cars,setCars,
    reviews, setReviews
  };

//   useEffect(() => {
//     getDoctorsData();
//   }, []);

//   useEffect(() => {
//     if (token) {
//       loadUserProfileData();
//     } else {
//       setUserData(false);
//     }
//   }, [token]);

  return (
    <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
  );
};

export default AppContextProvider;
