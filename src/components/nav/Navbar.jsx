import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowUpRight, FiMenu, FiPhone, FiX } from "react-icons/fi";

const links = [{ label: "Solutions", to: "/services" }, { label: "Mortgages", to: "/mortgages" }, { label: "Calculators", to: "/affordability" }, { label: "FAQ", to: "/faq" }, { label: "Contact", to: "/contact" }];

export default function Navbar() {
  const [open, setOpen] = useState(false); const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return <header className="premium-nav"><div className="premium-container nav-inner">
    <Link to="/" className="brand-lockup"><img src="/apex-prime-logo.jpeg" alt="Apex Prime Mortgages" /><span><strong>APEX PRIME</strong><small>MORTGAGES</small></span></Link>
    <nav className="desktop-nav" aria-label="Primary navigation">{links.map(link => <Link key={link.label} to={link.to} className={pathname === link.to ? "active" : ""}>{link.label}</Link>)}</nav>
    <div className="nav-actions"><a className="nav-phone" href="tel:18334989898"><FiPhone /><span>1-833-498-9898</span></a><Link className="nav-apply" to="/mortgageapplication">Apply now <FiArrowUpRight /></Link><button onClick={() => setOpen(!open)} className="menu-toggle" aria-label="Toggle navigation">{open ? <FiX /> : <FiMenu />}</button></div>
  </div><div className={`mobile-nav ${open ? "open" : ""}`}>{links.map(link => <Link key={link.label} to={link.to}>{link.label}<FiArrowUpRight /></Link>)}<a href="tel:18334989898">Call 1-833-498-9898</a></div></header>;
}
