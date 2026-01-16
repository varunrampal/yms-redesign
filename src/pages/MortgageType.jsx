import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const MORTGAGES = {
  "fixed-rate": {
    title: "Fixed-Rate Mortgage",
    bullets: [
      "Interest rate stays the same for the entire term",
      "Stable and predictable payments",
      "Most popular choice",
    ],
  },
  "variable-rate": {
    title: "Variable-Rate Mortgage",
    bullets: [
      "Interest rate changes with the prime rate",
      "Payments can go up or down",
      "Usually starts with a lower rate than fixed",
    ],
  },
  "adjustable-rate": {
    title: "Adjustable-Rate Mortgage (ARM)",
    bullets: [
      "Similar to variable, but the payment itself changes when rates change",
      "Good to understand cash-flow impact when rates move",
    ],
  },
  closed: {
    title: "Closed Mortgage",
    bullets: [
      "Lower interest rate",
      "Limits or penalties for early repayment",
      "Most common type used by homeowners",
    ],
  },
  open: {
    title: "Open Mortgage",
    bullets: [
      "Higher interest rate",
      "Can pay off anytime without penalty",
      "Used when selling soon or planning to refinance quickly",
    ],
  },
  "high-ratio": {
    title: "High-Ratio Mortgage",
    bullets: [
      "Down payment less than 20%",
      "Requires CMHC/insurer mortgage insurance",
      "Very common for first-time buyers",
    ],
  },
  conventional: {
    title: "Conventional Mortgage",
    bullets: ["Down payment 20% or more", "No mortgage insurance required"],
  },
  insured: {
    title: "Insured Mortgage",
    bullets: [
      "Mortgage with CMHC or private insurer backing",
      "Lower rates because risk is lower for lenders",
    ],
  },
  uninsured: {
    title: "Uninsured Mortgage",
    bullets: ["No insurance", "Usually requires 20%+ down payment"],
  },
  private: {
    title: "Private Mortgage",
    bullets: [
      "From private lenders, not banks",
      "Higher interest rates",
      "Used when bank qualification is not possible",
    ],
  },
  reverse: {
    title: "Reverse Mortgage",
    bullets: [
      "For homeowners 55+",
      "Borrow against home equity without monthly payments",
    ],
  },
  "second-heloc": {
    title: "Second Mortgage / HELOC",
    bullets: [
      "Borrowing on top of an existing mortgage",
      "Higher interest than first mortgage",
    ],
  },
};

export default function MortgageType() {
  const { type } = useParams();

  const data = useMemo(() => {
    return (
      MORTGAGES[type] || {
        title: "Mortgage Type",
        bullets: ["This mortgage type page was not found."],
      }
    );
  }, [type]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* <Link to="/mortgages" className="text-sm text-muted hover:text-text">
        ← Back to Mortgages
      </Link> */}

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-text">
        {data.title}
      </h1>

      <div className="mt-6 rounded-2xl border border-border bg-white p-6">
        <h2 className="text-lg font-bold text-text">Key points</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          {data.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-brand-tint p-6">
        <h3 className="text-base font-bold text-text">Want the best option for your situation?</h3>
        <p className="mt-2 text-sm text-muted">
          Get a quick recommendation based on your goals, down payment, and timeline.
        </p>
        <a
          href="#apply"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover"
        >
          Get Pre-Approved
        </a>
      </div>
    </div>
  );
}
