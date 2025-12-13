import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderUser from "../HeaderUser";
import SideBarAdmin from "../SideBarAdmin";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import AuthContext from "@/contexts/authContext";

const Layout = () => {
  const location = useLocation();
  const pathname = location?.pathname || "";
  const isAdmin = pathname.startsWith("/admin");
  const { user } = useContext(AuthContext);
  const role = user?.data?.role || user?.user?.role;
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL);
    socket.emit("room-admin");
    socket.on("NEW ORDER", (data) => {
      toast.success(data.message);
    });
  });
  return (
    <>
      {isAdmin ? (
        <SidebarProvider>
          <SideBarAdmin />
          <main className="flex-1 lg:p-6 p-4 pt-20 lg:pt-6 overflow-x-auto">
            <Outlet />
          </main>
        </SidebarProvider>
      ) : (
        <div className="min-h-screen bg-background">
          <HeaderUser />
          <main className="container px-4 py-6 mx-auto">
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};

export default Layout;
