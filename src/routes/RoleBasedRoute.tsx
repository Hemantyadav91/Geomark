import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Role } from "../types/auth";

interface RoleBasedRouteProps {
  allowedRole: Role;
}

export const RoleBasedRoute = ({ allowedRole }: RoleBasedRouteProps) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role !== allowedRole) {
    return <Navigate to={`/${currentUser.role}`} replace />;
  }

  return <Outlet />;
};
