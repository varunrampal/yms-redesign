import React from "react";
import Container from "../../components/layout/Container.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";

export default function Steps() {
  const steps = [
    { n: "01", title: "Quick discovery", desc: "We clarify your goals, timeline, and document checklist." },
    { n: "02", title: "Lender + strategy match", desc: "Compare options, negotiate terms, and choose the best fit." },
    { n: "03", title: "Approval & closing", desc: "We guide conditions and closing steps right to the finish line." },
  ];

  return (
    <section id="process">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-text">A professional, 3-step process</h2>
            <p className="mt-2 text-muted">Fast, transparent, and supported through closing.</p>
          </div>
          <Button href="#apply" className="w-fit" icon="🚀">
            Start My Application
          </Button>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <Card key={s.n} className="relative overflow-hidden p-6">
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20 blur-2xl"
                style={{ background: "var(--color-brand)" }}
              />
              <div className="relative text-sm font-extrabold text-brand">{s.n}</div>
              <div className="relative mt-2 text-lg font-extrabold text-text">{s.title}</div>
              <div className="relative mt-2 text-sm text-muted">{s.desc}</div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
