import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // modern icons

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-xl bg-white/10 border-b border-white/20 text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wide drop-shadow-lg">
          <span className="bg-gradient-to-r from-gray-200 via-gray-400 to-gray-500 bg-clip-text text-transparent">
            SmartGrid
          </span>
          <span className="text-gray-100">AC</span>
        </div>


        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg">
          <NavLink to="/signup" label="Signup" />
          <NavLink to="/login" label="Login" />
          <NavLink to="/dashboard" label="Dashboard" />
          <NavLink to="/analytics" label="Analytics" />
          <NavLink to="/energy" label="Energy" />
          <NavLink to="/notifications" label="Notifications" />
          <NavLink to="/device-health" label="Device Health" />
          <NavLink to="/maintenance" label="Maintenance" />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/40 backdrop-blur-xl border-t border-white/10 p-4 space-y-4">
          <MobileLink to="/signup" label="Signup" />
          <MobileLink to="/login" label="Login" />
          <MobileLink to="/dashboard" label="Dashboard" />
          <MobileLink to="/analytics" label="Analytics" />
          <MobileLink to="/energy" label="Energy" />
          <MobileLink to="/notifications" label="Notifications" />
          <MobileLink to="/device-health" label="Device Health" />
          <MobileLink to="/maintenance" label="Maintenance" />
        </div>
      )}
    </nav>
  );
}

// 🌟 Reusable NavLink for Desktop
const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="relative group transition font-medium"
  >
    {label}
    <span className="absolute left-0 w-0 group-hover:w-full h-[2px] bg-white transition-all duration-300 bottom-0"></span>
  </Link>
);

// 🌟 Reusable NavLink for Mobile
const MobileLink = ({ to, label }) => (
  <Link
    to={to}
    className="block text-lg font-medium text-white hover:bg-white/10 rounded-xl p-3 transition"
  >
    {label}
  </Link>
);
