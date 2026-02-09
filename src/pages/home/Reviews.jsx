import React from "react";
import Container from "../../components/layout/Container.jsx";
import Card from "../../components/ui/Card.jsx";

export default function Reviews() {
  const reviews = [
    { name: "Brittney Smith", text: "Clear guidance, fast responses, and a smooth closing- even with a tight timeline." },
    { name: "Manjeet Sidhu", text: "Helped us compare lenders and saved us thousands in interest." },
    { name: "Kamal Ahuja", text: "Made the entire mortgage process simple with excellent communication throughout." },
    { name: "Amandeep Singh", text: "Got us approved after the bank said no. Strong knowledge of alternative lending." },
    { name: "Arthur", text: "Professional, transparent and extremely organizedfrom start to finish." },
    { name: "Jennika Duncan", text: "Quick pre-approval and clear guidance on required documents." },
  ];

  return (
    <section id="reviews">
      <Container className="py-12 sm:py-16">
        <h2 className="text-2xl font-extrabold tracking-tight text-text">Client reviews</h2>
        <p className="mt-2 text-muted">Replace these with your real Google reviews/testimonials.</p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <Card key={r.name} className="p-5">
              <div className="text-sm text-muted">★★★★★</div>
              <div className="mt-2 text-sm text-muted">“{r.text}”</div>
              <div className="mt-4 text-sm font-semibold text-text">{r.name}</div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
