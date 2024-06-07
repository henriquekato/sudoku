import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoute;
