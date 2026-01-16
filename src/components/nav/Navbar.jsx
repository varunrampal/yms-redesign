import React from "react";
import Container from "../layout/Container.jsx";
import Button from "../ui/Button.jsx";
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

  const links = [
  { label: "Affordability", anchor: "calculators", route: "/affordability" },
  { label: "Services", anchor: "services", route: "/services" },
  { label: "Mortgages", route: "/mortgages" }, // dropdown
  { label: "FAQ", anchor: "faq", route: "/faq" },
  { label: "Contact", anchor: "contact", route: "/contact" },
];

const { pathname } = useLocation();
const onHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/70 backdrop-blur-xl">
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
  <Button href="#apply" icon="✅">
    Get Pre-Approved
  </Button>
</div>

        <div className="md:hidden">
          <Button variant="outline" href="#apply" icon="✅">
            Apply
          </Button>
        </div>
      </Container>
    </header>
  );
}
