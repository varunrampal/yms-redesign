import React from "react";
import Container from "../../components/layout/Container.jsx";
import Card from "../../components/ui/Card.jsx";

export default function FAQ() {
  const faqs = [
    {
      q: "Do you charge a fee?",
      a: "In many cases, the lender pays the broker. Some private/alternative deals may involve fees—explained upfront.",
    },
    {
      q: "Fixed vs variable—what’s better?",
      a: "It depends on your timeline, risk comfort, and goals. We’ll show scenarios so you can decide confidently.",
    },
    {
      q: "What documents do I need?",
      a: "Typically ID, income proof, down payment proof, and existing mortgage statements (if applicable).",
    },
    {
      q: "Can you help if my bank declined me?",
      a: "Yes—alternative lenders and private options may fit depending on your situation.",
    },
  ];

  return (
    <section id="faq">
      <Container className="py-12 sm:py-16">
        <h2 className="text-2xl font-extrabold tracking-tight text-text">FAQ</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {faqs.map((f) => (
            <Card key={f.q} className="p-6">
              <div className="font-extrabold text-text">{f.q}</div>
              <div className="mt-2 text-sm text-muted">{f.a}</div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
