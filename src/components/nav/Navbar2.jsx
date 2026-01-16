import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileKeys, setOpenMobileKeys] = useState({}); // { "Services": true, "Services>Mortgage Types": true }

  const items = useMemo(
    () => [
      { label: "Home", to: "/" },
      { label: "About", to: "#calculator" },

      {
        label: "Services",
        to: "/services",
        children: [
          { label: "Purchase", to: "/services/purchase" },
          { label: "Refinance", to: "/services/refinance" },
          {
            label: "Mortgage Types",
            to: "/services/mortgage-types",
            children: [
              { label: "Fixed Rate", to: "/services/mortgage-types/fixed" },
              { label: "Variable Rate", to: "/services/mortgage-types/variable" },
              { label: "First-Time Buyer", to: "/services/mortgage-types/first-time" },
            ],
          },
        ],
      },

      {
        label: "Tools",
        to: "/tools",
        children: [
          { label: "Affordability Calculator", to: "/tools/affordability" },
          { label: "Payment Calculator", to: "/tools/payment" },
        ],
      },

      { label: "Contact", to: "/contact" },
    ],
    []
  );

  const toggleMobileKey = (key) =>
    setOpenMobileKeys((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Left: Logo */}
        <Link to="/" className="inline-flex items-center gap-3">
          <img
            src="/logo-colour.png"
            alt="The Mortgages"
            className="h-12 w-auto" // make bigger: h-14 / h-16
          />
          {/* Optional tagline */}
          {/* <span className="hidden text-xs font-medium text-muted sm:block">BC Mortgage Broker</span> */}
        </Link>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <DesktopItem key={item.label} item={item} />
          ))}
        </nav>

        {/* Right: phone + socials (desktop) */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:16048328791"
            className="rounded-lg border border-border px-3 py-2 text-sm font-semibold text-text hover:bg-brand-tint"
          >
            📞 604-832-8791
          </a>

          <a
            href="https://www.facebook.com/YOUR_PAGE"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text hover:bg-brand-tint"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.instagram.com/YOUR_PAGE"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text hover:bg-brand-tint"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3">
            {/* Mobile: phone + socials */}
            <div className="mb-3 flex items-center gap-3">
              <a
                href="tel:16048328791"
                className="flex-1 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-text"
              >
                📞 604-832-8791
              </a>

              <a
                href="https://www.facebook.com/YOUR_PAGE"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/YOUR_PAGE"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-text"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>

            <div className="space-y-1">
              {items.map((item) => (
                <MobileItem
                  key={item.label}
                  item={item}
                  pathKey={item.label}
                  openKeys={openMobileKeys}
                  toggleKey={toggleMobileKey}
                  closeAll={() => setMobileOpen(false)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Desktop (hover dropdown) ---------------- */

function DesktopItem({ item, level = 0 }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  // Top-level button styles
  const topBtn =
    "relative rounded-lg px-3 py-2 text-sm font-semibold text-text hover:bg-brand-tint";

  if (!hasChildren) {
    return (
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          cx(topBtn, isActive && "bg-brand-tint")
        }
      >
        {item.label}
      </NavLink>
    );
  }

  // Dropdown container uses group for hover
  return (
    <div className="relative group">
      <NavLink to={item.to} className={topBtn}>
        <span className="inline-flex items-center gap-1">
          {item.label} <span className="text-xs">▾</span>
        </span>
      </NavLink>

      {/* Level 1 dropdown */}
      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition
                      absolute left-0 top-full mt-2 w-56 rounded-xl border border-border bg-white shadow-lg p-2">
        {item.children.map((child) => (
          <DesktopDropdownItem key={child.label} item={child} />
        ))}
      </div>
    </div>
  );
}

function DesktopDropdownItem({ item }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  if (!hasChildren) {
    return (
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          cx(
            "flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-brand-tint",
            isActive && "bg-brand-tint"
          )
        }
      >
        {item.label}
      </NavLink>
    );
  }

  // Level 2 dropdown (sub-menu)
  return (
    <div className="relative group/sub">
      <NavLink
        to={item.to}
        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-brand-tint"
      >
        <span>{item.label}</span>
        <span className="text-xs">▸</span>
      </NavLink>

      <div className="invisible opacity-0 group-hover/sub:visible group-hover/sub:opacity-100 transition
                      absolute left-full top-0 ml-2 w-56 rounded-xl border border-border bg-white shadow-lg p-2">
        {item.children.map((child) => (
          <NavLink
            key={child.label}
            to={child.to}
            className={({ isActive }) =>
              cx(
                "block rounded-lg px-3 py-2 text-sm hover:bg-brand-tint",
                isActive && "bg-brand-tint"
              )
            }
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Mobile (accordion multi-level) ---------------- */

function MobileItem({ item, pathKey, openKeys, toggleKey, closeAll, level = 0 }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const isOpen = !!openKeys[pathKey];

  const pad = level === 0 ? "pl-0" : level === 1 ? "pl-4" : "pl-8";

  if (!hasChildren) {
    return (
      <NavLink
        to={item.to}
        onClick={closeAll}
        className={({ isActive }) =>
          cx(
            "block rounded-lg px-3 py-2 text-sm font-semibold hover:bg-brand-tint",
            pad,
            isActive && "bg-brand-tint"
          )
        }
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div className="rounded-lg border border-border">
      <button
        type="button"
        onClick={() => toggleKey(pathKey)}
        className={cx(
          "w-full px-3 py-2 text-left text-sm font-semibold hover:bg-brand-tint rounded-lg flex items-center justify-between",
          pad
        )}
      >
        <span>{item.label}</span>
        <span className="text-xs">{isOpen ? "▴" : "▾"}</span>
      </button>

      {isOpen && (
        <div className="pb-2">
          {/* Optional: a direct link to parent route */}
          <NavLink
            to={item.to}
            onClick={closeAll}
            className={({ isActive }) =>
              cx(
                "block rounded-lg px-3 py-2 text-sm hover:bg-brand-tint",
                level === 0 ? "pl-4" : level === 1 ? "pl-8" : "pl-12",
                isActive && "bg-brand-tint"
              )
            }
          >
            View {item.label}
          </NavLink>

          {item.children.map((child) => (
            <MobileItem
              key={child.label}
              item={child}
              pathKey={`${pathKey}>${child.label}`}
              openKeys={openKeys}
              toggleKey={toggleKey}
              closeAll={closeAll}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
