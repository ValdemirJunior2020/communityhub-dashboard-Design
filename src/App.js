// src/App.js
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import AdminUsers from "./pages/AdminUsers";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import ForgotPassword from "./pages/ForgotPassword";
import Inspections from "./pages/Inspections";
import Login from "./pages/Login";
import Maintenance from "./pages/Maintenance";
import Owners from "./pages/Owners";
import Properties from "./pages/Properties";
import RentPayments from "./pages/RentPayments";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Tenants from "./pages/Tenants";
import Units from "./pages/Units";
import Vendors from "./pages/Vendors";
import WorkOrders from "./pages/WorkOrders";

const dashboardRoles = ["superAdmin", "admin", "manager", "viewer"];
const standardRoles = ["superAdmin", "admin", "manager"];
const maintenanceRoles = ["superAdmin", "admin", "manager", "maintenance", "viewer"];
const adminRoles = ["superAdmin", "admin"];

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<RoleRoute allowedRoles={dashboardRoles}><Dashboard /></RoleRoute>} />
          <Route path="/properties" element={<RoleRoute allowedRoles={standardRoles}><Properties /></RoleRoute>} />
          <Route path="/units" element={<RoleRoute allowedRoles={standardRoles}><Units /></RoleRoute>} />
          <Route path="/tenants" element={<RoleRoute allowedRoles={standardRoles}><Tenants /></RoleRoute>} />
          <Route path="/rent-payments" element={<RoleRoute allowedRoles={standardRoles}><RentPayments /></RoleRoute>} />
          <Route path="/maintenance" element={<RoleRoute allowedRoles={maintenanceRoles}><Maintenance /></RoleRoute>} />
          <Route path="/work-orders" element={<RoleRoute allowedRoles={maintenanceRoles}><WorkOrders /></RoleRoute>} />
          <Route path="/inspections" element={<RoleRoute allowedRoles={standardRoles}><Inspections /></RoleRoute>} />
          <Route path="/owners" element={<RoleRoute allowedRoles={standardRoles}><Owners /></RoleRoute>} />
          <Route path="/vendors" element={<RoleRoute allowedRoles={standardRoles}><Vendors /></RoleRoute>} />
          <Route path="/documents" element={<RoleRoute allowedRoles={standardRoles}><Documents /></RoleRoute>} />
          <Route path="/reports" element={<RoleRoute allowedRoles={standardRoles}><Reports /></RoleRoute>} />
          <Route path="/settings" element={<RoleRoute allowedRoles={adminRoles}><Settings /></RoleRoute>} />
          <Route path="/admin-users" element={<RoleRoute allowedRoles={adminRoles}><AdminUsers /></RoleRoute>} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
