import React, { useState,useEffect  } from "react";
import Container from "../layout/Container.jsx";
import Button from "../ui/Button.jsx";
import HamburgerButton from "../mobilemenu/HamburgerButton.jsx";
import MobileMenu from "../mobilemenu/MobileMenu.jsx";
import { Link, useLocation } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";


export default function Navbar() {
  // const links = [
  //   ["Affordability", "#calculators"],
  //   ["Services", "#services"],
  //   ["Mortgages", "#mortgages"],
  //   ["FAQ", "#faq"],
  //   ["Contact", "#contact"],
  // ];
  const [open, setOpen] = useState(false);
  const [mortgageOpen, setMortgageOpen] = useState(false);
  const links = [
  { label: "Affordability", anchor: "calculators", route: "/affordability" },
  { label: "Services", anchor: "services", route: "/services" },
  { label: "Mortgages", route: "/mortgages" }, // dropdown
  { label: "FAQ", route: "/faq" },
  { label: "Contact", anchor: "contact", route: "/contact" },
];

const { pathname } = useLocation();
const onHome = pathname === "/";

useEffect(() => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => (document.body.style.overflow = "auto");
}, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/70 ">
      <Container className="flex h-16 items-center justify-between">
<Link to="/" className="group flex items-center gap-3">
  <img
    src="/logo-colour.png"
    alt="The Mortgages"
    className="h-14 w-auto"
  />
</Link>

<nav className="hidden items-center gap-6 text-sm md:flex">
  {links.map((item) => {
    // Mortgages dropdown stays route-based
    if (item.label === "Mortgages") {
      return (
        <div key="mortgages" className="relative group">
          <Link to="/mortgages" className="text-muted hover:text-text inline-flex items-center gap-1">
            Mortgages <span className="text-xs">▾</span>
          </Link>

          {/* hover bridge */}
          <div className="absolute left-0 top-full h-3 w-64" />

          {/* dropdown */}
          <div className="absolute left-0 top-full mt-3 w-72 rounded-xl border border-border bg-white shadow-lg p-2
                          invisible opacity-0 pointer-events-none transition
                          group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto">
            <Link to="/mortgages/fixed-rate" className="block rounded-lg px-3 py-2 text-sm text-text hover:bg-brand-tint">
              Fixed-Rate Mortgage
            </Link>
            <Link to="/mortgages/variable-rate" className="block rounded-lg px-3 py-2 text-sm text-text hover:bg-brand-tint">
              Variable-Rate Mortgage
            </Link>
            <Link to="/mortgages/adjustable-rate" className="block rounded-lg px-3 py-2 text-sm text-text hover:bg-brand-tint">
              Adjustable-Rate Mortgage (ARM)
            </Link>
            <Link to="/mortgages/closed" className="block rounded-lg px-3 py-2 text-sm text-text hover:bg-brand-tint">
              Closed Mortgage
            </Link>
            <Link to="/mortgages/open" className="block rounded-lg px-3 py-2 text-sm text-text hover:bg-brand-tint">
              Open Mortgage
            </Link>
            <Link to="/mortgages/high-ratio" className="block rounded-lg px-3 py-2 text-sm text-text hover:bg-brand-tint">
              High-Ratio Mortgage
            </Link>
            <Link to="/mortgages/conventional" className="block rounded-lg px-3 py-2 text-sm text-text hover:bg-brand-tint">
              Conventional Mortgage
            </Link>
            <Link to="/mortgages/insured" className="block rounded-lg px-3 py-2 text-sm text-text hover:bg-brand-tint">
              Insured Mortgage
            </Link>
            <Link to="/mortgages/uninsured" className="block rounded-lg px-3 py-2 text-sm text-text hover:bg-brand-tint">
              Uninsured Mortgage
            </Link>
            <Link to="/mortgages/private" className="block rounded-lg px-3 py-2 text-sm text-text hover:bg-brand-tint">
              Private Mortgage
            </Link>
            <Link to="/mortgages/reverse" className="block rounded-lg px-3 py-2 text-sm text-text hover:bg-brand-tint">
              Reverse Mortgage
            </Link>
            <Link to="/mortgages/second-heloc" className="block rounded-lg px-3 py-2 text-sm text-text hover:bg-brand-tint">
              Second Mortgage / HELOC
            </Link>
           
          </div>
        </div>
      );
    }

    // If it has an anchor:
    if (item.anchor) {
      // On home → anchor scroll
      if (onHome) {
        return (
          <a
            key={item.label}
            href={`#${item.anchor}`}
            className="text-muted hover:text-text"
          >
            {item.label}
          </a>
        );
      }

      // Not on home:
      // If you created a separate page route, go there.
      // Otherwise, fall back to home + anchor.
      if (item.route) {
        return (
          <Link key={item.label} to={item.route} className="text-muted hover:text-text">
            {item.label}
          </Link>
        );
      }

      return (
        <Link key={item.label} to={`/#${item.anchor}`} className="text-muted hover:text-text">
          {item.label}
        </Link>
      );
    }

    // Default route link
    return (
      <Link key={item.label} to={item.route} className="text-muted hover:text-text">
        {item.label}
      </Link>
    );
  })}
</nav>






        {/* <div className="hidden items-center gap-2 md:flex">
          <Button variant="outline" href="#book" icon="📅">
            Book a Call
          </Button>
          <Button href="#apply" icon="✅">
            Get Pre-Approved
          </Button>
        </div> */}
        <div className="hidden items-center gap-3 md:flex">
  {/* Phone */}
  <a
    href="tel:16042172992"
    className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-text hover:bg-brand-tint"
  >
    📞 604-217-2992
  </a>

  {/* Social Icons */}
  <a
    href="https://www.facebook.com/YOUR_PAGE"
    target="_blank"
    rel="noreferrer"
    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white text-text hover:bg-brand-tint"
    aria-label="Facebook"
  >
    <FaFacebookF className="text-[16px]" />
  </a>

  <a
    href="https://www.instagram.com/YOUR_PAGE"
    target="_blank"
    rel="noreferrer"
    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white text-text hover:bg-brand-tint"
    aria-label="Instagram"
  >
    <FaInstagram className="text-[16px]" />
  </a>

  {/* Keep buttons if you still want them */}
  {/* <Button variant="outline" href="#book" icon="📅">
    Book a Call
  </Button> */}
  <Button href="/mortgageapplication" >
   Apply Now
  </Button>
</div>

     {/* Mobile Hamburger */}
<div className="md:hidden flex items-center gap-3">
  <Button
    variant="outline"
    href="/mortgageapplication"
    className="px-3 py-2 text-sm"
  >
    Apply
  </Button>

  <button
    onClick={() => setOpen(!open)}
    className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5"
    aria-label="Toggle menu"
  >
    <span
      className={`h-0.5 w-6 bg-text transition-all duration-300 ${
        open ? "translate-y-2 rotate-45" : ""
      }`}
    />
    <span
      className={`h-0.5 w-6 bg-text transition-all duration-300 ${
        open ? "opacity-0" : ""
      }`}
    />
    <span
      className={`h-0.5 w-6 bg-text transition-all duration-300 ${
        open ? "-translate-y-2 -rotate-45" : ""
      }`}
    />
  </button>
</div>

      </Container>
{/* Overlay */}
<div
  onClick={() => setOpen(false)}
  className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 md:hidden ${
  open ? "opacity-100 visible" : "opacity-0 invisible"
}`}
/>

{/* Mobile Drawer */}
<div
  className={`fixed top-0 right-0 z-50 h-full w-[85%] max-w-sm
              bg-brand text-white border-l border-gray-800 shadow-2xl
              transform transition-all duration-500 ease-out md:hidden
              ${open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
            `}
>
  {/* Close Button */}
<button
  onClick={() => setOpen(false)}
  className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition"
  aria-label="Close menu"
>
  <span className="relative block h-0.5 w-5 bg-white rotate-45" />
  <span className="absolute block h-0.5 w-5 bg-white -rotate-45" />
</button>
  <div className="flex flex-col gap-6 px-6 pt-24 text-lg font-semibold">
    
    {/* Affordability */}
    {onHome ? (
      <a
        href="/calculators"
        onClick={() => setOpen(false)}
        className="border-b pb-3"
      >
        Affordability
      </a>
    ) : (
      <Link
        to="/affordability"
        onClick={() => setOpen(false)}
        className="border-b pb-3"
      >
        Affordability
      </Link>
    )}

    {/* Services */}
    <Link
      to="/services"
      onClick={() => setOpen(false)}
      className="border-b pb-3"
    >
      Services
    </Link>
        <Link
      to="/faq"
      onClick={() => setOpen(false)}
      className="border-b pb-3"
    >
      FAQ
    </Link>
     <Link
      to="/faq"
      onClick={() => setOpen(false)}
      className="border-b pb-3"
    >
      Contact
    </Link>

    {/* 📱 Mortgages Accordion */}
    <div className="border-b pb-3">
      <button
        onClick={() => setMortgageOpen(!mortgageOpen)}
        className="flex w-full items-center justify-between"
      >
        Mortgages
        <span
          className={`transition-transform duration-300 ${
            mortgageOpen ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          mortgageOpen ? "max-h-[500px] mt-3" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-3 pl-3 text-base font-medium">
          <Link to="/mortgages/fixed-rate" onClick={() => setOpen(false)}>Fixed-Rate</Link>
          <Link to="/mortgages/variable-rate" onClick={() => setOpen(false)}>Variable-Rate</Link>
          <Link to="/mortgages/adjustable-rate" onClick={() => setOpen(false)}>Adjustable-Rate</Link>
          <Link to="/mortgages/open" onClick={() => setOpen(false)}>Open Mortgage</Link>
          <Link to="/mortgages/closed" onClick={() => setOpen(false)}>Closed Mortgage</Link>
          <Link to="/mortgages/reverse" onClick={() => setOpen(false)}>Reverse Mortgage</Link>
          <Link to="/mortgages/private" onClick={() => setOpen(false)}>Private Mortgage</Link>
          <Link to="/mortgages/high-ratio" onClick={() => setOpen(false)}>High-Ratio Mortgage</Link>
          <Link to="/mortgages/conventional" onClick={() => setOpen(false)}>Conventional Mortgage</Link>
          <Link to="/mortgages/insured" onClick={() => setOpen(false)}>Insured Mortgage</Link>
          <Link to="/mortgages/second-heloc" onClick={() => setOpen(false)}>second-heloc</Link>
        </div>
      </div>
    </div>

    {/* FAQ */}
    <Link
      to="/faq"
      onClick={() => setOpen(false)}
      className="border-b pb-3"
    >
      FAQ
    </Link>

    {/* Contact */}
    <Link
      to="/contact"
      onClick={() => setOpen(false)}
      className="border-b pb-3"
    >
      Contact
    </Link>

    <Button
    variant="outline"
    href="/mortgageapplication"
    className="px-3 py-2 text-sm"
  >
    Apply
  </Button>
  </div>
</div>


    </header>
  );
}
