import React from "react";

export default function StatPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-white/80 px-4 py-3 shadow-lg">
      <div className="text-[11px] font-semibold text-muted">{label}</div>
      <div className="mt-1 text-sm font-extrabold tracking-tight text-text">{value}</div>
    </div>
  );
}
