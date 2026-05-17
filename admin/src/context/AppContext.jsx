import { createContext, useState, useEffect } from "react";
import axios from "axios";
//import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "PKR";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const adminUrl  = import.meta.env.VITE_ADMIN_PANEL_URL;

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [userData, setUserData] = useState(false);
  const [isLoader, setIsLoader] = useState(true);

  const loadUserProfileData = async () => {
    if (!token) {
      setUserData(false);
      setIsLoader(false);
      return;
    }

    setIsLoader(true);
    try {
      const { data } = await axios.get(backendUrl + "/api/users/get-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        setUserData(false);
      }
    } catch (error) {
      console.log(error);
      setUserData(false);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    loadUserProfileData();
  }, [token]);

  const value = {
    currencySymbol,
    token,
    setToken,
    backendUrl,
    isLoader,
    userData,
  };

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
