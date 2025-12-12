import AuthContext from "@/contexts/authContext";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role: requiredRoles }) => {
  const { user } = useContext(AuthContext);
  console.log("user", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  const role = user?.data?.role || user?.user?.role;
  if (!requiredRoles.includes(role)) {
    if (role === "admin" || role === "admin") {
      toast.error("Bạn không có quyền truy cập");
      return <Navigate to="/admin" />;
    }
    if (role === "user" || role === "user") {
      toast.error("Bạn không có quyền truy cập");
      return <Navigate to="/menu" />;
    }
  }
  return children;
};

export default ProtectedRoute;
