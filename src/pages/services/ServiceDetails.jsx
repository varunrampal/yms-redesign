import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/layout/Container.jsx";
import Card from "../../components/ui/Card.jsx";

const SERVICES = {
  "refinance-renewal": {
    title: "Refinance & Renewal",
    subtitle: "Lower your payment, improve your terms, or access better options at renewal time.",
    highlights: ["Compare lenders", "Penalty review", "Better cash-flow"],
    paragraphs: [
      "Refinancing or renewing is a chance to improve your mortgage—not just the rate, but the flexibility, prepayment options, and long-term cost. We compare your current terms with new options so you can make a smart move.",
      "If you’re breaking a mortgage early, we review penalties and show you the break-even point. That way you’ll know exactly when savings start to outweigh costs.",
      "At renewal, we help you avoid “auto-renew” traps by shopping your options and matching you with the best term for your goals and timeline.",
    ],
    ctaTitle: "Thinking about refinancing or renewing?",
    ctaText: "Send your current rate, balance, and renewal date—then we’ll map your best options.",
    ctaHref: "/contact",
    faqs: [
      { q: "Will I pay a penalty to refinance?", a: "Often yes—depends on your lender, term, and rate type. We calculate it upfront." },
      { q: "Should I renew early?", a: "Sometimes it makes sense. We compare early-renewal offers vs waiting." },
    ],
  },

  "first-time-homebuyer": {
    title: "First-Time Homebuyer",
    subtitle: "Step-by-step guidance so you buy with confidence—no confusion, no surprises.",
    highlights: ["Budget clarity", "Down payment guidance", "Smooth closing"],
    paragraphs: [
      "Buying your first home can feel overwhelming—down payments, closing costs, approvals, and timelines. We simplify everything into clear steps so you know what to do and when.",
      "We help you understand how much you can comfortably afford, what monthly payments might look like, and which mortgage type fits your situation best.",
      "From your offer to the lender’s conditions and closing day, we stay on top of the details so the process feels smooth and stress-free.",
    ],
    ctaTitle: "Buying your first home?",
    ctaText: "Let’s review your budget and create a clear plan for approval and closing.",
    ctaHref: "/contact",
    faqs: [
      { q: "How much down payment do I need?", a: "It depends on the purchase price and your eligibility—often as low as 5%." },
      { q: "What closing costs should I plan for?", a: "A common estimate is around 3% (legal, adjustments, taxes, etc.)." },
    ],
  },

  "mortgage-pre-approval": {
    title: "Mortgage Pre-Approval",
    subtitle: "Know your budget, strengthen your offer, and shop with confidence.",
    highlights: ["Fast review", "Document checklist", "Clear range"],
    paragraphs: [
      "A pre-approval gives you a clear estimate of what you can qualify for before you start shopping. It helps you move faster, make stronger offers, and avoid surprises later.",
      "We review your income, debts, down payment, and credit profile, then recommend the best strategy based on your goals—lowest payment, best rate, or flexibility.",
      "You’ll receive a clear checklist and guidance on what to avoid during the process so your approval stays on track.",
    ],
    ctaTitle: "Ready to get pre-approved?",
    ctaText: "Send your details and we’ll reply with next steps and a simple document checklist.",
    ctaHref: "/contact",
    faqs: [
      { q: "How long does it take?", a: "Often 24–48 hours once we have the documents." },
      { q: "Is it guaranteed?", a: "It’s a strong estimate, but final approval depends on the property and underwriting." },
    ],
  },

  "alternative-lending": {
    title: "Alternative Lending",
    subtitle: "When banks say no, we help you find a workable solution—clearly and responsibly.",
    highlights: ["Flexible options", "B-lenders/private", "Plan to improve"],
    paragraphs: [
      "Alternative lending can help when traditional banks won’t approve—due to credit challenges, income complexity, new business, or unique property types.",
      "We explore alternative lenders and private options based on your exact situation, explain the costs transparently, and structure a solution that supports your short-term needs.",
      "Most importantly, we create a plan to transition you back to better terms over time—so this is a stepping stone, not a permanent situation.",
    ],
    ctaTitle: "Need an approval solution?",
    ctaText: "Tell us your timeline and challenge—then we’ll outline realistic next steps.",
    ctaHref: "/contact",
    faqs: [
      { q: "Is alternative lending more expensive?", a: "Often yes, but it can solve time-sensitive needs and can be temporary." },
      { q: "Can I switch back to a bank later?", a: "In many cases, yes—once income/credit improves. We plan for that." },
    ],
  },

  "investment-properties": {
    title: "Investment Properties",
    subtitle: "Finance rentals with a strategy that protects cash flow and improves qualification.",
    highlights: ["Rental income", "Down payment guidance", "Lender strategy"],
    paragraphs: [
      "Investment mortgages are different—lenders look at rental income, your overall debt ratios, and the property type. The right structure can make qualifying easier and keep payments manageable.",
      "We help you compare lender rules, down payment requirements, and how rental income is treated, so you can choose the most effective approach.",
      "You’ll get clarity on payment scenarios, cash-flow expectations, and a lender-ready plan so you can move quickly on the right property.",
    ],
    ctaTitle: "Buying a rental property?",
    ctaText: "Let’s check qualification and build a lender-ready plan for your next purchase.",
    ctaHref: "/contact",
    faqs: [
      { q: "Can rental income help me qualify?", a: "Yes—many lenders include a portion, depending on policy and documents." },
      { q: "Do I need 20% down?", a: "Often yes, but it can vary by lender and property type." },
    ],
  },

  "equity-takeout": {
    title: "Equity Takeout",
    subtitle: "Access your home equity for debt consolidation, renovations, or investments—smartly.",
    highlights: ["Debt consolidation", "Renovations", "Equity planning"],
    paragraphs: [
      "Equity takeout lets you borrow against the value you’ve built in your home. It can be used to consolidate high-interest debt, fund renovations, invest, or improve monthly cash flow.",
      "We compare refinance vs HELOC vs second mortgage options and explain the impact on payment, interest cost, and flexibility so you choose the right structure.",
      "You’ll get a clear plan for affordability and long-term stability, with numbers that make sense—not just the maximum you can borrow.",
    ],
    ctaTitle: "Want to access your equity?",
    ctaText: "Send your estimated home value and mortgage balance—then we’ll outline your best options.",
    ctaHref: "/contact",
    faqs: [
      { q: "How much equity can I access?", a: "Often up to ~80% loan-to-value, depending on qualification and lender rules." },
      { q: "Is a HELOC better than refinancing?", a: "Depends on your goals—HELOC is flexible, refinance can reduce rate/payment." },
    ],
  },
};

export default function ServiceDetails() {
  const { slug } = useParams();

  const data = useMemo(() => {
    return (
      SERVICES[slug] || {
        title: "Service Not Found",
        subtitle: "This service page doesn’t exist.",
        highlights: [],
        paragraphs: ["Please return to Services and choose a service to learn more."],
        ctaTitle: "Need help choosing?",
        ctaText: "Contact us and we’ll guide you to the right option.",
        ctaHref: "/contact",
        faqs: [],
      }
    );
  }, [slug]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-tint to-white" />

      <Container className="relative py-10 sm:py-14">
        {/* Top bar */}
        {/* <div className="flex items-center justify-between gap-4">
          <Link to="/services" className="text-sm font-semibold text-muted hover:text-text">
            ← Back to Services
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover"
          >
            Ask a Question
          </Link>
        </div> */}

        {/* Hero */}
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
              {data.title}
            </h1>
            <p className="mt-3 max-w-2xl text-muted">{data.subtitle}</p>

            {data.highlights?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {data.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-semibold text-text"
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}

            <Card className="mt-6 p-6 sm:p-7">
              <div className="text-sm font-extrabold text-text">What to expect</div>
              <div className="mt-3 space-y-3 text-sm leading-6 text-muted">
                {data.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Card>
          </div>

          {/* Sticky CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-57">
              <Card className="p-8">
                <div className="text-sm font-extrabold text-text">{data.ctaTitle}</div>
                <p className="mt-2 text-sm text-muted">{data.ctaText}</p>

                <Link
                  to={data.ctaHref}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-hover"
                >
                  Get Started
                </Link>

                <div className="mt-4 rounded-2xl border border-border bg-white/70 p-4 text-xs text-muted">
                  Typically responds within 1 business day.
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ */}
        {data.faqs?.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-extrabold text-text">Quick FAQ</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {data.faqs.map((f) => (
                <Card key={f.q} className="p-6">
                  <div className="font-extrabold text-text">{f.q}</div>
                  <div className="mt-2 text-sm text-muted">{f.a}</div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
