/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute ({ children, adminOnly }: ProtectedRouteProps) {
  const token = localStorage.getItem("token"); // adjust to your auth system
  const role = localStorage.getItem("role"); //admin or user

  // Redirect to login if not logged in
  if (!token) {
    return <Navigate to={adminOnly ? "/admin-login" : "/login"}  replace />;
  }

  // If adminOnly is true but the user is not an admin
  if (adminOnly && role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

