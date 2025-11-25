import React, { useState } from "react";
import Navbar from "./compnents/Navbar.jsx";
import { useLocation } from "react-router-dom";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  return (
  <>
    {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
  </>
  );
}

export default App;
