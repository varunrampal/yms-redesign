import React from "react";
import Container from "../../components/layout/Container.jsx";
import Card from "../../components/ui/Card.jsx";
import { Link } from "react-router-dom";

export default function Calculators() {
  const cals = [
    { title: "Mortgage Payment Calculator", desc: "Estimate payments in seconds.", icon: "🧮", to: "/mortgagepaymentcalculator" },
    { title: "Affordability / Qualifier", desc: "See what you can qualify for.", icon: "📊", to: "/mortgageaffordability" },
    { title: "Refinance Savings", desc: "Estimate potential monthly savings.", icon: "💡", to: "/" },
  ];

  return (
    <section id="calculators" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-tint to-white" />

      <Container className="relative py-12 sm:py-16">
        <h2 className="text-2xl font-extrabold tracking-tight text-text">Calculators</h2>
        <p className="mt-2 text-muted">Clean, helpful tools (connect your real calculators next).</p>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {cals.map((c) => (
            <Card key={c.title} className="group p-6 transition hover:-translate-y-0.5 hover:shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 ring-1 ring-border shadow-lg">
                  <span className="text-lg">{c.icon}</span>
                </div>
                <div className="text-lg font-extrabold text-text">{c.title}</div>
              </div>

              <div className="mt-2 text-sm text-muted">{c.desc}</div>

              <Link
                to={c.to}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand"
              >
                Open <span className="transition group-hover:translate-x-0.5">→</span>
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
