// C:\Users\Valdemir Goncalves\Downloads\propel-properties-dashboard-saas-ready\propel-properties-dashboard\src\App.js
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Units from "./pages/Units";
import Tenants from "./pages/Tenants";
import RentPayments from "./pages/RentPayments";
import Maintenance from "./pages/Maintenance";
import WorkOrders from "./pages/WorkOrders";
import Inspections from "./pages/Inspections";
import Owners from "./pages/Owners";
import Vendors from "./pages/Vendors";
import Documents from "./pages/Documents";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import AdminUsers from "./pages/AdminUsers";
import TenantPortal from "./pages/TenantPortal";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import ReceiptPage from "./pages/ReceiptPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/units" element={<Units />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/rent-payments" element={<RentPayments />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/work-orders" element={<WorkOrders />} />
          <Route path="/inspections" element={<Inspections />} />
          <Route path="/owners" element={<Owners />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/tenant-portal" element={<TenantPortal />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
          <Route path="/receipt/:paymentId" element={<ReceiptPage />} />

          <Route
            path="/admin-users"
            element={
              <RoleRoute allowedRoles={["superAdmin", "admin"]}>
                <AdminUsers />
              </RoleRoute>
            }
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;