import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * ProtectedRoute props:
 * - requiredRole (optional): 'admin' to restrict to admins
 */
export default function ProtectedRoute({ requiredRole = null }) {
  const auth = useSelector((s) => s.auth);
  if (!auth.user) return <Navigate to="/login" replace />;
  if (requiredRole && auth.user.role !== requiredRole)
    return <Navigate to="/" replace />;
  return <Outlet />;
}
