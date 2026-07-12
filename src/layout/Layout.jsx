import React, { useState } from "react";
import { Outlet, Navigate } from "react-router";

import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

const Layout = () => {

  // =========================================
  // Sidebar State
  // =========================================

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // =========================================
  // Logged In User
  // =========================================

  const user =
    JSON.parse(localStorage.getItem("user"));

  // =========================================
  // Not Logged In
  // =========================================

  if (!user) {
    return (
      <Navigate
        to="/signin"
        replace
      />
    );
  }

  return (
    <div className="flex h-screen bg-Primary">

      {/* =========================================
          Sidebar
      ========================================= */}

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* =========================================
          Main Content
      ========================================= */}

      <div
        className="flex-1 flex flex-col
        lg:ml-[300px]"
      >

        {/* Header */}
        <Header
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">

          <Outlet />

        </main>
      </div>
    </div>
  );
};

export default Layout;



