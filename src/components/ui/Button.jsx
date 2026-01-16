import React from "react";

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  icon,
}) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition active:translate-y-[1px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15";

  const outline = "border border-border bg-white/70 text-text hover:bg-white";
  const soft = "border border-border bg-white/70 text-text";
  const primary = "text-white";

  const cls =
    variant === "primary"
      ? `${base} ${primary} ${className}`
      : variant === "outline"
      ? `${base} ${outline} ${className}`
      : `${base} ${soft} ${className}`;

  const style =
    variant === "primary"
      ? {
          background:
            "linear-gradient(135deg, var(--color-brand) 0%, color-mix(in oklab, var(--color-brand) 70%, white) 55%, var(--color-brand-hover) 100%)",
          boxShadow: "0 16px 48px rgb(from var(--color-brand) r g b / 0.22)",
        }
      : variant === "outline"
      ? { borderColor: "rgb(from var(--color-brand) r g b / 0.35)" }
      : undefined;

  const content = (
    <>
      {icon ? <span className="text-base">{icon}</span> : null}
      <span>{children}</span>
      {variant === "primary" ? (
        <span className="pointer-events-none absolute -right-7 -top-7 h-20 w-20 rounded-full bg-white/18 blur-2xl" aria-hidden="true" />
      ) : null}
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls} style={style}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls} style={style}>
      {content}
    </button>
  );
}
