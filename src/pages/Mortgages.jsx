import React from "react";
import { Link } from "react-router-dom";

const MORTGAGE_CARDS = [
  {
    slug: "fixed-rate",
    title: "Fixed-Rate Mortgage",
    desc: "Stable interest rate for the entire term. Predictable payments and budgeting.",
    tags: ["Stable payments", "Popular choice"],
  },
  {
    slug: "variable-rate",
    title: "Variable-Rate Mortgage",
    desc: "Rate changes with prime. Can start lower than fixed, but can move up or down.",
    tags: ["Often lower start", "Rate changes"],
  },
  {
    slug: "adjustable-rate",
    title: "Adjustable-Rate Mortgage (ARM)",
    desc: "Similar to variable, but your payment changes as rates change (not just interest).",
    tags: ["Payment changes", "Cash-flow impact"],
  },
  {
    slug: "closed",
    title: "Closed Mortgage",
    desc: "Often lower rates, but prepayment limits and penalties for breaking early.",
    tags: ["Lower rate", "Common option"],
  },
  {
    slug: "open",
    title: "Open Mortgage",
    desc: "Higher rate, but you can pay off anytime without penalty. Good for short term.",
    tags: ["Flexible", "No payout penalty"],
  },
  {
    slug: "high-ratio",
    title: "High-Ratio Mortgage",
    desc: "Down payment under 20%. Requires mortgage insurance (CMHC/insurer).",
    tags: ["< 20% down", "Insured"],
  },
  {
    slug: "conventional",
    title: "Conventional Mortgage",
    desc: "20%+ down payment. No mortgage insurance required.",
    tags: ["20%+ down", "No insurance"],
  },
  {
    slug: "insured",
    title: "Insured Mortgage",
    desc: "Backed by CMHC or private insurer. Often qualifies for lower lender rates.",
    tags: ["Lower risk", "Often better rates"],
  },
  {
    slug: "uninsured",
    title: "Uninsured Mortgage",
    desc: "No mortgage insurance. Usually requires 20%+ down payment.",
    tags: ["No insurance", "20%+ down"],
  },
  {
    slug: "private",
    title: "Private Mortgage",
    desc: "Private lenders (not banks). Higher rates; used when bank approval isn’t possible.",
    tags: ["Alternative lending", "Short-term"],
  },
  {
    slug: "reverse",
    title: "Reverse Mortgage",
    desc: "For homeowners 55+. Borrow against equity without monthly payments.",
    tags: ["55+", "Equity access"],
  },
  {
    slug: "second-heloc",
    title: "Second Mortgage / HELOC",
    desc: "Borrow against equity on top of an existing mortgage. Often higher rates than first.",
    tags: ["Equity", "Renovations/debt"],
  },
];

export default function Mortgages() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-text">
            Mortgage Types in Canada
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Explore the most common mortgage types and learn which options may fit your goals.
            
          </p>
        </div>

        {/* <Link
          to="/#apply"
          className="hidden sm:inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover"
        >
          Get Pre-Approved
        </Link> */}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MORTGAGE_CARDS.map((m) => (
          <div
            key={m.slug}
            className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-text">{m.title}</h2>
            <p className="mt-2 text-sm text-muted">{m.desc}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {m.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-white px-2.5 py-1 text-xs text-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Link
                to={`/mortgages/${m.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-hover"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>

              {/* <Link
                to={`/mortgages/${m.slug}`}
                className="text-sm font-semibold text-text hover:underline"
              >
                Details
              </Link> */}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-brand-tint p-6">
        <h3 className="text-base font-bold text-text">
          Not sure which mortgage type fits?
        </h3>
        <p className="mt-2 text-sm text-muted">
          Tell us your purchase timeline, down payment, and goals — we’ll recommend options.
        </p>
        <Link
          to="/contact"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover"
        >
         Contact Us
        </Link>
      </div>
    </div>
  );
}
