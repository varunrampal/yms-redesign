import React from "react";
import { Link } from "react-router-dom";
import Container from "../layout/Container.jsx";

export default function Footer() {
  return (
 <footer className="relative border-t border-border bg-white pb-16 md:pb-0 overflow-hidden">
  {/* soft background glow */}
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      background:
        "radial-gradient(900px 260px at 20% 0%, rgb(from var(--color-brand) r g b / 0.10) 0%, rgb(from var(--color-brand) r g b / 0) 60%)",
    }}
  />
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-tint to-transparent" />

  <Container className="relative py-12">
    <div className="grid gap-8 md:grid-cols-12">
      {/* Brand */}
      <div className="md:col-span-5">
        <div className="flex items-center gap-3">
          {/* <div
            className="h-11 w-11 rounded-2xl shadow-lg ring-1 ring-white/40"
            style={{
              background:
                "linear-gradient(135deg, var(--color-brand) 0%, color-mix(in oklab, var(--color-brand) 55%, white) 70%, var(--color-brand-hover) 100%)",
            }}
            aria-hidden="true"
          /> */}
          <div>
            <div className="text-base font-extrabold tracking-tight text-text">
             <Link to="/" className="group flex items-center gap-3">
  <img
    src="/apex-logo.png"
    alt="Apex Prime Mortgages"
    className="h-35 w-auto"
  />
</Link>
            </div>
            <div className="text-xs text-muted">Clear advice. Fast approvals. Real support.</div>
          </div>
        </div>

        <p className="mt-4 max-w-md text-sm text-muted leading-6">
          Mortgage solutions with clarity, speed, and support. We compare options across lenders to
          help you choose the right mortgage for your goals.
        </p>

        {/* Quick contact pills (optional) */}
        <div className="mt-5 flex flex-wrap gap-2">
        
          <a
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1.5 text-xs font-semibold text-text hover:bg-brand-tint"
          >Services</a>
           <a
            href="/affordability"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1.5 text-xs font-semibold text-text hover:bg-brand-tint"
          >Calculators</a>
            <a
            href="/mortgages"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1.5 text-xs font-semibold text-text hover:bg-brand-tint"
          >Mortgages</a>
           <a
            href="/faq"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1.5 text-xs font-semibold text-text hover:bg-brand-tint"
          >Faq</a>
           <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1.5 text-xs font-semibold text-text hover:bg-brand-tint"
          >Contact</a>
          {/* <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1.5 text-xs font-semibold text-text hover:bg-brand-tint"
          >
            <span aria-hidden="true">💬</span> Ask a Question
          </a>
          <a
            href="/mortgageaffordability"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1.5 text-xs font-semibold text-text hover:bg-brand-tint"
          >
            <span aria-hidden="true">📊</span> Affordability
          </a>
          <a
            href="/calculators"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1.5 text-xs font-semibold text-text hover:bg-brand-tint"
          >
            <span aria-hidden="true">🧮</span> Calculators
          </a> */}
        </div>
      </div>

      {/* Links */}
      {/* <div className="md:col-span-3">
      
        <div className="mt-3 grid gap-2 text-sm">
          {[
            { label: "Affordability", href: "/mortgageaffordability" },
            { label: "Services", href: "/services" },
            { label: "Calculators", href: "/calculators" },
            { label: "Mortgages", href: "/mortgages" },
            { label: "FAQ", href: "/faq" },
            { label: "Contact", href: "/contact" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group inline-flex items-center justify-between rounded-xl border border-transparent px-2 py-2 text-muted hover:border-border hover:bg-white/70 hover:text-text"
            >
              <span>{l.label}</span>
              <span className="opacity-0 transition group-hover:opacity-100">→</span>
            </a>
          ))}
        </div>
      </div> */}

      {/* Compliance */}
    
    </div>
      <div className="md:col-span-4">
        {/* <div className="text-sm font-extrabold text-text">Compliance</div> */}

        <div className="mt-3 rounded-2xl border border-border bg-white/75 p-4">
          <div className="text-sm font-semibold text-text">Important disclosure</div>
          <p className="mt-2 text-xs leading-5 text-muted">
            The information contained on this website is provided for general informational purposes only and does not constitute financial, legal, or other professional advice. Mortgage products, rates, terms, and availability are subject to change and are dependent on lender approval, credit qualification, and verification of information. Not all applicants will qualify.
          </p>

          {/* Optional: add your details here */}
          <div className="mt-3 grid gap-1 text-xs text-muted">
            <div className="flex items-start gap-2">
              <span aria-hidden="true">📍</span>
              <span>2961 Townline Rd, Abbotsford, BC V2T 5J8</span>
            </div>
            {/* <div className="flex items-start gap-2">
              <span aria-hidden="true">📝</span>
              <span>Add brokerage name + license # here (if required).</span>
            </div> */}
          </div>
        </div>
      </div>

    {/* Bottom bar */}
    <div className="mt-10 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
      <div>© {new Date().getFullYear()} Apexprimee. All rights reserved.</div>

      {/* <div className="flex flex-wrap gap-2">
        <a
          href="/privacy"
          className="rounded-full border border-border bg-white/70 px-3 py-1.5 hover:bg-brand-tint hover:text-text"
        >
          Privacy
        </a>
        <a
          href="/terms"
          className="rounded-full border border-border bg-white/70 px-3 py-1.5 hover:bg-brand-tint hover:text-text"
        >
          Terms
        </a>
      </div> */}
    </div>
  </Container>
</footer>

  );
}
