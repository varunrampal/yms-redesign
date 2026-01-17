import React, { useMemo, useState } from "react";
import Container from "../../components/layout/Container.jsx";
import Card from "../../components/ui/Card.jsx";

// --- tiny helper to highlight search matches ---
function highlight(text, query) {
  const q = query.trim();
  if (!q) return text;
  const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"));
  return parts.map((part, i) =>
    part.toLowerCase() === q.toLowerCase() ? (
      <mark
        key={i}
        className="rounded-md bg-brand-tint px-1 py-0.5 font-semibold text-text ring-1 ring-brand/20"
      >
        {part}
      </mark>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

function FAQItem({ f, open, onToggle, query }) {
  return (
    <Card
      className={[
        "overflow-hidden p-0 transition",
        "hover:-translate-y-0.5 hover:shadow-2xl",
        open ? "ring-2 ring-brand/20 shadow-2xl" : "shadow-sm",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left"
      >
        {/* Top band */}
        <div
          className={[
            "relative p-6 transition",
            open
              ? "bg-gradient-to-r from-brand/10 via-white to-brand/10"
              : "bg-white",
          ].join(" ")}
        >
          {/* subtle glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 ring-1 ring-border shadow-sm">
                  <span className="text-lg">❓</span>
                </span>

                {f.tag ? (
                  <span className="inline-flex items-center rounded-full border border-border bg-white/80 px-2.5 py-1 text-[11px] font-extrabold text-text">
                    {f.tag}
                  </span>
                ) : null}

                {open ? (
                  <span className="inline-flex items-center rounded-full bg-brand px-2.5 py-1 text-[11px] font-extrabold text-white">
                    Open
                  </span>
                ) : null}
              </div>

              <div className="mt-3 text-[15px] font-extrabold leading-snug text-text">
                {highlight(f.q, query)}
              </div>
            </div>

            {/* Chevron */}
            <span
              className={[
                "shrink-0 mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                "border border-border bg-white/80 shadow-sm transition",
                open ? "rotate-180 bg-brand-tint" : "group-hover:translate-x-0.5",
              ].join(" ")}
            >
              ▾
            </span>
          </div>
        </div>

        {/* Content with smooth animation */}
        <div
          className={[
            "grid transition-all duration-300 ease-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          ].join(" ")}
        >
          <div className="overflow-hidden">
            <div className="px-6 pb-6 text-sm leading-relaxed text-muted">
              {highlight(f.a, query)}
            </div>
          </div>
        </div>
      </button>
    </Card>
  );
}

export default function FAQ() {
  const [query, setQuery] = useState("");
  const [openSet, setOpenSet] = useState(() => new Set());

  const faqs = [
    {
      q: "Do you charge a fee?",
      a: "In many cases, the lender pays the broker. Some private/alternative deals may involve fees—explained upfront.",
      tag: "Fees",
    },
    {
      q: "Fixed vs variable—what’s better?",
      a: "It depends on your timeline, risk comfort, and goals. We’ll show scenarios so you can decide confidently.",
      tag: "Rates",
    },
    {
      q: "What documents do I need?",
      a: "Typically ID, income proof, down payment proof, and existing mortgage statements (if applicable).",
      tag: "Documents",
    },
    {
      q: "Can you help if my bank declined me?",
      a: "Yes—alternative lenders and private options may fit depending on your situation.",
      tag: "Alternative",
    },
    // ...your 50 FAQs
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs.map((f, i) => ({ ...f, _id: i }));
    return faqs
      .map((f, i) => ({ ...f, _id: i }))
      .filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q));
  }, [query, faqs]);

  const openAll = () => setOpenSet(new Set(filtered.map((f) => f._id)));
  const closeAll = () => setOpenSet(new Set());

  const toggle = (id) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="faq" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-tint to-white" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />

      <Container className="relative py-12 sm:py-16">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-text">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Quick, clear answers—so you can move forward with confidence.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1.5 text-xs font-semibold text-muted">
              <span className="inline-block h-2 w-2 rounded-full bg-brand" />
              Showing <b className="text-text">{filtered.length}</b> of{" "}
              <b className="text-text">{faqs.length}</b>
            </div>
          </div>

          {/* Search panel */}
          <div className="w-full sm:w-[460px]">
            <div className="rounded-3xl border border-border bg-white/70 p-4 shadow-sm backdrop-blur">
              <label className="mb-2 block text-sm font-semibold text-text">
                Search FAQs
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                  🔎
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try: down payment, rates, refinance, credit…"
                  className="w-full rounded-2xl border border-border bg-white/80 py-3 pl-10 pr-20 text-text outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2"
                />
                {query.trim() && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border border-border bg-white px-3 py-1.5 text-sm font-semibold text-text transition hover:bg-brand-tint"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={openAll}
                  disabled={filtered.length === 0}
                  className="rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-hover disabled:opacity-50"
                >
                  Expand all
                </button>
                <button
                  type="button"
                  onClick={closeAll}
                  className="rounded-xl border border-border bg-white/80 px-3 py-2 text-sm font-semibold text-text transition hover:bg-brand-tint"
                >
                  Collapse all
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {filtered.map((f) => (
            <FAQItem
              key={f._id}
              f={f}
              open={openSet.has(f._id)}
              onToggle={() => toggle(f._id)}
              query={query}
            />
          ))}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="mt-10 rounded-3xl border border-border bg-white/70 p-10 text-center shadow-sm backdrop-blur">
            <div className="text-xl font-extrabold text-text">No matches found</div>
            <div className="mt-2 text-sm text-muted">
              Try a broader term like <b className="text-text">“rate”</b>,{" "}
              <b className="text-text">“income”</b>, or{" "}
              <b className="text-text">“pre-approval”</b>.
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
