import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../Pages/Home/Home";

const ProtectedRoute = () => {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  // if (loggedIn === "true") return <Home />;
  if (loggedIn === "false") return <Navigate to="/login" />;
  else {
    return <Home />;
  }
};

export default ProtectedRoute;
