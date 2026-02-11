import React from "react";

export default function HamburgerButton({ open, setOpen }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
      aria-label="Toggle menu"
    >
      <span
        className={`h-0.5 w-6 bg-brand transition-all duration-300 ${
          open ? "translate-y-2 rotate-45" : ""
        }`}
      />
      <span
        className={`h-0.5 w-6 bg-brand transition-all duration-300 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`h-0.5 w-6 bg-brand transition-all duration-300 ${
          open ? "-translate-y-2 -rotate-45" : ""
        }`}
      />
    </button>
  );
}
