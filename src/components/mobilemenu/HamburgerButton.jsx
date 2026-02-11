import React from "react";

export default function HamburgerButton({ open, setOpen }) {
  return (
   <button
  onClick={() => setOpen(!open)}
  className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
  aria-label="Toggle menu"
>
  <span
    className={`h-0.5 w-6 transition-all duration-300 ${
      open ? "translate-y-2 rotate-45 bg-white" : "bg-text"
    }`}
  />
  <span
    className={`h-0.5 w-6 transition-all duration-300 ${
      open ? "opacity-0 bg-white" : "bg-text"
    }`}
  />
  <span
    className={`h-0.5 w-6 transition-all duration-300 ${
      open ? "-translate-y-2 -rotate-45 bg-white" : "bg-text"
    }`}
  />
</button>

  );
}
