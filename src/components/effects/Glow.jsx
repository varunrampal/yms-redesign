import React from "react";

export default function Glow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-28 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--color-brand)" }}
      />
      <div className="absolute -bottom-32 -left-28 h-[26rem] w-[26rem] rounded-full bg-indigo-400/15 blur-3xl" />
      <div className="absolute -right-28 top-1/3 h-[26rem] w-[26rem] rounded-full bg-cyan-400/10 blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at 50% 15%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 15%, black 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
