import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../nav/Navbar.jsx";
import Footer from "../footer/Footer.jsx";

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
