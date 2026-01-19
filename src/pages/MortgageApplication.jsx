import React, { useMemo, useState } from "react";
import Container from "../components/layout/Container.jsx";
import Card from "../components/ui/Card.jsx";

const PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];

const moneyOnly = (v) => String(v || "").replace(/[^\d]/g, "");
const phoneOnly = (v) => String(v || "").replace(/[^\d+]/g, "");
const emailOk = (v) => /^\S+@\S+\.\S+$/.test(String(v || "").trim());

export default function MortgageApplication() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

const [dir, setDir] = useState(1); // 1 = next (slide left), -1 = back (slide right)

const goNext = () => {
  if (!canNext) return;
  setDir(1);
  setStep((s) => Math.min(steps.length - 1, s + 1));
};

const goBack = () => {
  setDir(-1);
  setStep((s) => Math.max(0, s - 1));
};



  // honeypot (spam)
  const [company, setCompany] = useState("");

  const [form, setForm] = useState({
    // Contact
    fullName: "",
    phone: "",
    email: "",

    // Deal
    purpose: "Purchase",
    city: "",
    province: "British Columbia",
    priceOrValue: "",
    downOrEquity: "",
    mortgageNeeded: "",
    closingDate: "",

    // Income
    employmentType: "Employed",
    incomeAnnual: "",
    monthlyDebts: "",

    // Co-applicant
    hasCoApplicant: false,
    coName: "",
    coIncomeAnnual: "",

    // Notes + consent
    notes: "",
    consent: false,
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const steps = useMemo(
    () => [
      { key: "contact", title: "Contact" },
      { key: "deal", title: "Deal" },
      { key: "income", title: "Income" },
      { key: "review", title: "Review" },
    ],
    []
  );

  const progress = useMemo(() => {
    const pct = ((step + 1) / steps.length) * 100;
    return Math.min(100, Math.max(0, pct));
  }, [step, steps.length]);

  const stepErrors = useMemo(() => validateStep(step, form), [step, form]);

  const canNext = stepErrors.length === 0;
  const isLast = step === steps.length - 1;

  async function onSubmit() {
    setError("");
    const errs = validateAll(form);
    if (errs.length) {
      setError(errs[0]);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        phone: phoneOnly(form.phone),
        priceOrValue: moneyOnly(form.priceOrValue),
        downOrEquity: moneyOnly(form.downOrEquity),
        mortgageNeeded: moneyOnly(form.mortgageNeeded),
        incomeAnnual: moneyOnly(form.incomeAnnual),
        monthlyDebts: moneyOnly(form.monthlyDebts),
        coIncomeAnnual: moneyOnly(form.coIncomeAnnual),
        company,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch("/api/mortgage-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Submission failed.");

      setDone(true);
    } catch (e) {
      setError(e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-tint to-white" />
        <Container className="relative py-12 sm:py-16">
          <Card className="p-10 text-center">
            <div className="text-4xl">✅</div>
            <h2 className="mt-4 text-2xl font-extrabold text-text">
              Application received
            </h2>
            <p className="mt-2 text-muted">
              Thanks! We’ll review your details and contact you shortly.
            </p>
          </Card>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-tint to-white" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />

      <Container className="relative py-12 sm:py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-text">
            Mortgage Application
          </h1>
          <p className="mt-2 text-muted">
           Complete our mortgage application in 2 minutes & we will get back to you.
          </p>
        </div>

        {/* Honeypot */}
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {/* Left: wizard */}
          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-8">
              {/* Step header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    Step {step + 1} of {steps.length}
                  </div>
                  <div className="mt-1 text-xl font-extrabold text-text">
                    {steps[step].title}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-white/70 px-3 py-2 text-xs font-semibold text-muted">
                  Progress <b className="text-text">{Math.round(progress)}%</b>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-2 w-full rounded-full bg-white/70 ring-1 ring-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Body */}
             <div className="mt-6 relative overflow-hidden">
  <div
    key={step}
    className={[
      "animate-step",
      dir === 1 ? "animate-step-next" : "animate-step-back",
    ].join(" ")}
  >
    {step === 0 && <ContactStep form={form} set={set} />}
    {step === 1 && <DealStep form={form} set={set} />}
    {step === 2 && <IncomeStep form={form} set={set} />}
    {step === 3 && <ReviewStep form={form} />}
  </div>
</div>

              {/* Inline validation */}
              {stepErrors.length > 0 && (
                <div className="mt-5 rounded-2xl border border-border bg-white/80 p-4 text-sm text-red-600">
                  {stepErrors[0]}
                </div>
              )}

              {/* Controls */}
              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  type="button"
                 onClick={goBack}
                  disabled={step === 0 || loading}
                  className="rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm font-semibold text-text transition hover:bg-brand-tint disabled:opacity-50"
                >
                  ← Back
                </button>

                {!isLast ? (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canNext || loading}
                    className="rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover disabled:opacity-60"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onSubmit}
                    disabled={loading}
                    className="rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover disabled:opacity-60"
                  >
                    {loading ? "Submitting…" : "Submit Application"}
                  </button>
                )}
              </div>

              {/* Footer error */}
              {error && (
                <div className="mt-4 rounded-2xl border border-border bg-white/80 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}
            </Card>
          </div>

          {/* Right: live summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6">
                <div className="text-sm font-extrabold text-text">Summary</div>
                <div className="mt-3 space-y-2 text-sm text-muted">
                  <Row label="Name" value={form.fullName || "-"} />
                  <Row label="Purpose" value={form.purpose || "-"} />
                  <Row label="City" value={form.city || "-"} />
                  <Row label="Province" value={form.province || "-"} />
                  <Row
                    label={form.purpose === "Purchase" ? "Price" : "Value"}
                    value={form.priceOrValue ? `$${moneyOnly(form.priceOrValue)}` : "-"}
                  />
                  <Row
                    label={form.purpose === "Purchase" ? "Down" : "Equity"}
                    value={form.downOrEquity ? `$${moneyOnly(form.downOrEquity)}` : "-"}
                  />
                  <Row
                    label="Mortgage"
                    value={form.mortgageNeeded ? `$${moneyOnly(form.mortgageNeeded)}` : "-"}
                  />
                </div>

                <div className="mt-4 rounded-2xl border border-border bg-white/70 p-3 text-xs text-muted">
                  Your info is sent securely to our admin team for review.
                </div>

                {/* Step pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {steps.map((s, idx) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setStep(idx)}
                      className={[
                        "rounded-full border px-3 py-1 text-xs font-semibold transition",
                        idx === step
                          ? "border-brand bg-brand-tint text-text"
                          : "border-border bg-white/70 text-muted hover:bg-brand-tint",
                      ].join(" ")}
                    >
                      {idx + 1}. {s.title}
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- Steps ---------------- */

function ContactStep({ form, set }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Full name *" value={form.fullName} onChange={(v) => set("fullName", v)} placeholder="Your full name" />
      <Field label="Phone *" value={form.phone} onChange={(v) => set("phone", v)} placeholder="604-xxx-xxxx" />
      <div className="sm:col-span-2">
        <Field label="Email *" type="email" value={form.email} onChange={(v) => set("email", v)} placeholder="you@email.com" />
      </div>
    </div>
  );
}

function DealStep({ form, set }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Select label="Purpose" value={form.purpose} onChange={(v) => set("purpose", v)} options={["Purchase", "Refinance", "Renewal"]} />
      <Field label="City *" value={form.city} onChange={(v) => set("city", v)} placeholder="Abbotsford" />
      <Select label="Province" value={form.province} onChange={(v) => set("province", v)} options={PROVINCES} />

      <Field
        label={form.purpose === "Purchase" ? "Purchase price" : "Current value"}
        value={form.priceOrValue}
        onChange={(v) => set("priceOrValue", v)}
        placeholder="e.g. 850000"
        inputMode="numeric"
      />

      <Field
        label={form.purpose === "Purchase" ? "Down payment" : "Available equity"}
        value={form.downOrEquity}
        onChange={(v) => set("downOrEquity", v)}
        placeholder="e.g. 150000"
        inputMode="numeric"
      />

      <Field
        label="Mortgage needed"
        value={form.mortgageNeeded}
        onChange={(v) => set("mortgageNeeded", v)}
        placeholder="e.g. 700000"
        inputMode="numeric"
      />

      <Field label="Closing date (optional)" type="date" value={form.closingDate} onChange={(v) => set("closingDate", v)} />
    </div>
  );
}

function IncomeStep({ form, set }) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Employment type"
          value={form.employmentType}
          onChange={(v) => set("employmentType", v)}
          options={["Employed", "Self-Employed", "Hourly", "Commission", "Other"]}
        />

        <Field
          label="Annual household income"
          value={form.incomeAnnual}
          onChange={(v) => set("incomeAnnual", v)}
          placeholder="e.g. 120000"
          inputMode="numeric"
        />

        <Field
          label="Monthly debts (optional)"
          value={form.monthlyDebts}
          onChange={(v) => set("monthlyDebts", v)}
          placeholder="e.g. 500"
          inputMode="numeric"
        />
      </div>

      <div className="mt-5 flex items-center gap-2">
        <input
          id="coapp"
          type="checkbox"
          checked={form.hasCoApplicant}
          onChange={(e) => set("hasCoApplicant", e.target.checked)}
          className="h-4 w-4 accent-[var(--color-brand)]"
        />
        <label htmlFor="coapp" className="text-sm font-semibold text-text">
          Add a co-applicant (optional)
        </label>
      </div>

      {form.hasCoApplicant && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Co-applicant name" value={form.coName} onChange={(v) => set("coName", v)} placeholder="Full name" />
          <Field
            label="Co-applicant annual income"
            value={form.coIncomeAnnual}
            onChange={(v) => set("coIncomeAnnual", v)}
            placeholder="e.g. 80000"
            inputMode="numeric"
          />
        </div>
      )}

      <div className="mt-5">
        <label className="text-sm font-semibold text-text">Notes (optional)</label>
        <textarea
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={4}
          placeholder="Timeline, credit notes, rental plans, etc."
          className="mt-2 w-full rounded-2xl border border-border bg-white/80 p-3 text-text outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2"
        />
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-border bg-white/70 p-4">
        <input
          id="consent"
          type="checkbox"
          checked={form.consent}
          onChange={(e) => set("consent", e.target.checked)}
          className="mt-1 h-4 w-4 accent-[var(--color-brand)]"
        />
        <label htmlFor="consent" className="text-sm text-muted">
          I consent to be contacted about my mortgage request and understand that a credit review may
          be required to complete an application.
          <span className="block mt-1 text-xs">(You can withdraw consent at any time.)</span>
        </label>
      </div>
    </div>
  );
}

function ReviewStep({ form }) {
  const fmt = (v) => (v ? v : "-");
  const money = (v) => (v ? `$${moneyOnly(v)}` : "-");

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-white/70 p-4">
        <div className="text-sm font-extrabold text-text">Contact</div>
        <div className="mt-2 grid gap-2 text-sm text-muted sm:grid-cols-2">
          <Row label="Name" value={fmt(form.fullName)} />
          <Row label="Phone" value={fmt(form.phone)} />
          <div className="sm:col-span-2">
            <Row label="Email" value={fmt(form.email)} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white/70 p-4">
        <div className="text-sm font-extrabold text-text">Deal</div>
        <div className="mt-2 grid gap-2 text-sm text-muted sm:grid-cols-2">
          <Row label="Purpose" value={fmt(form.purpose)} />
          <Row label="Location" value={`${fmt(form.city)}, ${fmt(form.province)}`} />
          <Row label={form.purpose === "Purchase" ? "Price" : "Value"} value={money(form.priceOrValue)} />
          <Row label={form.purpose === "Purchase" ? "Down" : "Equity"} value={money(form.downOrEquity)} />
          <Row label="Mortgage" value={money(form.mortgageNeeded)} />
          <Row label="Closing" value={fmt(form.closingDate)} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white/70 p-4">
        <div className="text-sm font-extrabold text-text">Income</div>
        <div className="mt-2 grid gap-2 text-sm text-muted sm:grid-cols-2">
          <Row label="Employment" value={fmt(form.employmentType)} />
          <Row label="Income" value={money(form.incomeAnnual)} />
          <Row label="Debts" value={money(form.monthlyDebts)} />
          <Row label="Co-applicant" value={form.hasCoApplicant ? "Yes" : "No"} />
          {form.hasCoApplicant && (
            <>
              <Row label="Co name" value={fmt(form.coName)} />
              <Row label="Co income" value={money(form.coIncomeAnnual)} />
            </>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-brand-tint p-4">
        <div className="text-sm font-extrabold text-text">Notes</div>
        <div className="mt-2 text-sm text-muted whitespace-pre-wrap">
          {form.notes || "—"}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Validation ---------------- */

function validateStep(step, f) {
  const errs = [];
  if (step === 0) {
    if (!f.fullName.trim()) errs.push("Please enter your full name.");
    if (!f.phone.trim()) errs.push("Please enter your phone number.");
    if (!f.email.trim() || !emailOk(f.email)) errs.push("Please enter a valid email.");
  }
  if (step === 1) {
    if (!f.city.trim()) errs.push("Please enter your city.");
  }
  if (step === 2) {
    if (!f.consent) errs.push("Please accept consent to proceed.");
  }
  return errs;
}

function validateAll(f) {
  const errs = [];
  if (!f.fullName.trim()) errs.push("Missing full name.");
  if (!f.phone.trim()) errs.push("Missing phone.");
  if (!f.email.trim() || !emailOk(f.email)) errs.push("Invalid email.");
  if (!f.city.trim()) errs.push("Missing city.");
  if (!f.consent) errs.push("Consent is required.");
  return errs;
}

/* ---------------- UI helpers ---------------- */

function Field({ label, value, onChange, placeholder, type = "text", inputMode }) {
  return (
    <div>
      <label className="text-sm font-semibold text-text">{label}</label>
      <input
        type={type}
        value={value}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-border bg-white/80 px-3 py-3 text-text outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-sm font-semibold text-text">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-border bg-white/80 px-3 py-3 text-text outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-text">{value}</span>
    </div>
  );
}
