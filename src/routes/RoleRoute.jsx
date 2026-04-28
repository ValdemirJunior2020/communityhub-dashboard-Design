// src/routes/RoleRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import { hasAnyRole } from "../utils/permissions";

function RoleRoute({ allowedRoles = [], children }) {
  const { userProfile, loading } = useAuth();

  if (loading) return <LoadingSpinner label="Loading permissions..." />;

  if (!hasAnyRole(userProfile, allowedRoles)) {
    return <Navigate to={userProfile?.role === "maintenance" ? "/maintenance" : "/dashboard"} replace />;
  }

  return children;
}

export default RoleRoute;
