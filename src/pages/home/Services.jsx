import React from "react";
import Container from "../../components/layout/Container.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import { useLocation } from "react-router-dom";

export default function Services() {
  const services = [
    { title: "Refinancing & Renewals", desc: "Lower your payments, access equity, or improve your mortgage terms.", tag: "Most popular",  icon: "📉"  },
    { title: "First-Time Homebuyer", desc: "Buying your first home can feel overwhelming, but I make it simple.", tag: "Save monthly", icon: "🏡"},
    { title: "Mortgage Pre-Approval", desc: "Get a clear picture of how much you can afford before you shop.", tag: "Negotiate",icon: "✅"  },
    { title: "Alternative Lending", desc: "When traditional banks say no, there are still options.", tag: "Flexible", icon: "🔁" },
     { title: "Investment Properties", desc: "Grow your real estate portfolio with smart financing strategies.", tag: "Flexible", icon: "💸" },
      { title: "Equity Takeout", desc: "Put your home equity to work. .", tag: "Flexible", icon: "💰" },
      
  ];

  const { pathname } = useLocation();
const onHome = pathname === "/";

  return (
    <section id="services">
      <Container className="py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-text">Services</h2>
            <p className="mt-2 text-muted">Professional mortgage guidance for every stage.</p>
          </div>
         {onHome && (
  <div className="hidden sm:block">
    <Button variant="outline" href="#contact" icon="💬">
      Ask a Question
    </Button>
  </div>
)}
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Card key={s.title} className="group relative overflow-hidden p-5 transition hover:-translate-y-0.5 hover:shadow-2xl">
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(900px 240px at 20% 0%, rgb(from var(--color-brand) r g b / 0.14) 0%, rgb(from var(--color-brand) r g b / 0) 60%)",
                }}
              />

              <div className="relative flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-lg shadow-lg ring-1 ring-border">
                  {s.icon}
                </div>
                <span className="relative rounded-full bg-brand-tint px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/15">
                  {s.tag}
                </span>
              </div>

              <div className="relative mt-4 text-base font-extrabold text-text">{s.title}</div>
              <div className="relative mt-2 text-sm text-muted">{s.desc}</div>
              <a href="#contact" className="relative mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Learn more <span className="transition group-hover:translate-x-0.5">→</span>
              </a>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
