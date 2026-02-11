import React from "react";
import { Link } from "react-router-dom";

export default function MobileMenu({ open, setOpen }) {
  return (
    <div
      className={`fixed inset-0 z-40 bg-white transition-transform duration-300 md:hidden ${
        open ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-col items-center justify-center gap-8 pt-28 text-lg font-semibold">
        <Link to="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link to="/mortgages" onClick={() => setOpen(false)}>
          Mortgages
        </Link>
        <Link to="/affordability" onClick={() => setOpen(false)}>
          Affordability
        </Link>
        <Link to="/services" onClick={() => setOpen(false)}>
          Services
        </Link>
        <Link to="/contact" onClick={() => setOpen(false)}>
          Contact
        </Link>
      </div>
    </div>
  );
}
