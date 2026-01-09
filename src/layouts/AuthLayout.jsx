import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDarkMode } from "../hooks/useDarkMode";

const AuthLayout = () => {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "dark bg-gray-900" : "bg-white"
      }`}
    >
      <Navbar />
      <main
        className={`flex-grow py-8 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
