import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import HeaderUser from "../HeaderUser";
import SideBarAdmin from "../SideBarAdmin";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";

const Layout = () => {
  const location = useLocation();
  const pathname = location?.pathname || "";
  const isAdmin = pathname.startsWith("/admin");

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
