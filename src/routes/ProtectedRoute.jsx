// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import { isActiveUser } from "../utils/permissions";

function ProtectedRoute() {
  const { currentUser, userProfile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner fullScreen label="Checking your secure workspace..." />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!isActiveUser(userProfile)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="max-w-xl rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-red-500">Access paused</p>
          <h1 className="mt-3 text-3xl font-black text-slate-950">Your account is inactive.</h1>
          <p className="mt-3 text-lg font-semibold text-slate-600">
            Please contact an administrator to reactivate access to the property dashboard.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
