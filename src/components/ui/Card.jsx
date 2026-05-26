import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`relative rounded-3xl border border-border bg-white/90 shadow-xl backdrop-blur ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 rounded-t-3xl opacity-70"
        style={{
          background:
            "linear-gradient(180deg, rgb(from var(--color-brand) r g b / 0.10) 0%, rgb(from var(--color-brand) r g b / 0.00) 100%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
