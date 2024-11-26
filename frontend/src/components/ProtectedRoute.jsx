import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({ element: Element }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (localStorage.token) return <Element />;

  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
