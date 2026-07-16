import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  // =========================================
  // Not Logged In
  // =========================================

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // =========================================
  // Role Not Allowed
  // =========================================

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/user" replace />;
  }

  // =========================================
  // Allowed
  // =========================================

  return children;
};

export default ProtectedRoute;