import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDarkMode } from "../hooks/useDarkMode";

const MainLayout = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`flex flex-col min-h-screen app-shell ${darkMode ? "dark" : ""}`}>
      <Navbar />
      <main className="flex-grow py-8 main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
