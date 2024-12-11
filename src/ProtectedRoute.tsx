// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/login",
  adminOnly = false,
}) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  let isAdmin = false;
  if (isAuthenticated) {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    isAdmin = decodedToken?.isAdmin || false;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
