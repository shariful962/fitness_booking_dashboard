import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({
  children,
  allowedRoles,
}) => {

  const user =
    JSON.parse(localStorage.getItem("user"));

  // =========================================
  // Not Logged In
  // =========================================

  if (!user) {
    return (
      <Navigate
        to="/signin"
        replace
      />
    );
  }

  // =========================================
  // Role Not Allowed
  // =========================================

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return (
      <Navigate
        to="/user"
        replace
      />
    );
  }

  // =========================================
  // Allowed
  // =========================================

  return children;
};

export default ProtectedRoute;