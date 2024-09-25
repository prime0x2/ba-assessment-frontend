import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { logout } = useAuth();

  const token = Cookies.get("ba-token");

  if (!token) {
    logout();
    return <Navigate to='/' />;
  }

  return children;
};

export default PrivateRoute;
