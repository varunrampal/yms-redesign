import React from "react";
import Container from "../../components/layout/Container.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import { useLocation, Link } from "react-router-dom";

export default function Services() {
const services = [
  {
    slug: "refinance-renewal",
    title: "Refinancing & Renewals",
    desc: "Lower your payments, access equity, or improve your mortgage terms.",
    tag: "Most popular",
    icon: "📉",
    href: "/services/refinance-renewal",
  },
  {
    slug: "first-time-homebuyer",
    title: "First-Time Homebuyer",
    desc: "Buying your first home can feel overwhelming, but I make it simple.",
    tag: "Guided",
    icon: "🏡",
    href: "/services/first-time-homebuyer",
  },
  {
    slug: "mortgage-pre-approval",
    title: "Mortgage Pre-Approval",
    desc: "Get a clear picture of how much you can afford before you shop.",
    tag: "Negotiate",
    icon: "✅",
    href: "/services/mortgage-pre-approval",
  },
  {
    slug: "alternative-lending",
    title: "Alternative Lending",
    desc: "When traditional banks say no, there are still options.",
    tag: "Flexible",
    icon: "🔁",
    href: "/services/alternative-lending",
  },
  {
    slug: "investment-properties",
    title: "Investment Properties",
    desc: "Grow your real estate portfolio with smart financing strategies.",
    tag: "Strategy",
    icon: "💸",
    href: "/services/investment-properties",
  },
  {
    slug: "equity-takeout",
    title: "Equity Takeout",
    desc: "Put your home equity to work.",
    tag: "Cash flow",
    icon: "💰",
    href: "/services/equity-takeout",
  },
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
      Have a Question?
    </Button>
  </div>
)}
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
{services.map((s) => (
  <Card key={s.slug} className="group p-6 transition hover:-translate-y-0.5 hover:shadow-2xl">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 ring-1 ring-border shadow-lg">
          <span className="text-lg">{s.icon}</span>
        </div>
        <div>
          <div className="text-lg font-extrabold text-text">{s.title}</div>
          <div className="mt-1 text-sm text-muted">{s.desc}</div>
        </div>
      </div>

      <span className="rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-semibold text-text">
        {s.tag}
      </span>
    </div>

    <Link
      to={s.href}
      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand"
    >
      Learn more <span className="transition group-hover:translate-x-0.5">→</span>
    </Link>
  </Card>
))}
        </div>
      </Container>
    </section>
  );
}
