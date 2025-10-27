// src/App.jsx
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import DeliveryDashboard from "./pages/deliverManDashboard/DeliveryDashboard";
import UserDetailsPage from "./pages/UserDetailsPage";
import UserListPage from "./pages/deliverManDashboard/UserListPage";
import ColonyPage from "./pages/deliverManDashboard/ColonyPage";
import AreaPage from "./pages/deliverManDashboard/AreaPage";

// Private Route Wrapper
function PrivateRoute({ children, allowedRole }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (allowedRole && user.role !== allowedRole)
    return <Navigate to="/" replace />;
  return children;
}

// Default Route: redirect according to role
function DefaultRoute() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "delivery")
        navigate("/delivery-dashboard", { replace: true });
      else navigate("/user-dashboard", { replace: true });
    }
  }, [user, navigate]);

  return user ? null : <Login />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white flex flex-col">
      <Routes>
        <Route path="/" element={<DefaultRoute />} />
        <Route path="/register" element={<Register />} />

        {/* User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute allowedRole="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />

        {/* Delivery Dashboard Base Route */}
        <Route
          path="/delivery-dashboard"
          element={
            <PrivateRoute allowedRole="delivery">
              <DeliveryDashboard />
            </PrivateRoute>
          }
        />

        {/* Nested Delivery Pages */}
        <Route
          path="/delivery-dashboard/area"
          element={
            <PrivateRoute allowedRole="delivery">
              <AreaPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/delivery-dashboard/area/:areaId/colonies"
          element={
            <PrivateRoute allowedRole="delivery">
              <ColonyPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/delivery-dashboard/area/:areaId/colony/:colonyId/users"
          element={
            <PrivateRoute allowedRole="delivery">
              <UserListPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/delivery-dashboard/user/:id"
          element={
            <PrivateRoute allowedRole="delivery">
              <UserDetailsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
