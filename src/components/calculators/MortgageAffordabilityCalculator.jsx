import React, { useEffect, useMemo, useState } from "react";

/**
 * RBC-style Mortgage Affordability Calculator (React + Tailwind)
 *
 * UI goals (based on your reference screenshots):
 * - First view shows 3 textboxes: Income, Expenses (opens flyout), Down payment
 * - Expenses textbox opens a flyout with: Loans, Credit Card balance, Credit Line limit, Other Debt, Condo Fees
 * - Multi-step flow with Continue/Back
 *
 * Calculation goals:
 * - Estimate max monthly housing cost using GDS/TDS caps (defaults 39% / 44%)
 * - Estimate max mortgage from mortgage-payment budget using (optional) stress-test qualifying rate
 */

function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}

function money(n) {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  });
}

function pct(n) {
  if (!Number.isFinite(n)) return "0%";
  return (n * 100).toFixed(1) + "%";
}

function loanFromMonthlyPayment(payment, annualRate, amortYears) {
  const n = amortYears * 12;
  const r = annualRate / 12;
  if (payment <= 0) return 0;
  if (r === 0) return payment * n;
  const pow = Math.pow(1 + r, n);
  return (payment * (pow - 1)) / (r * pow);
}

function qualifyingRate(contractRate) {
  // Greater of contract + 2% or 5.25% (OSFI uninsured MQR rule)
  return Math.max(contractRate + 0.02, 0.0525);
}

const steps = [
  { id: "income", title: "Income" },
  { id: "home", title: "Home Costs & Rate" },
  { id: "results", title: "Results" },
];

export default function MortgageAffordabilityCalculator() {
  const [stepIndex, setStepIndex] = useState(0);

  // Inputs
  const [annualIncome, setAnnualIncome] = useState(120000);
  const [downPayment, setDownPayment] = useState(50000);

  // Expenses flyout (RBC-style)
  const [expensesOpen, setExpensesOpen] = useState(false);
  const [loanPaymentsMonthly, setLoanPaymentsMonthly] = useState(0);
  const [creditCardBalance, setCreditCardBalance] = useState(0);
  const [creditLineLimit, setCreditLineLimit] = useState(0);
  const [otherDebtMonthly, setOtherDebtMonthly] = useState(0);
  const [condoFeesMonthly, setCondoFeesMonthly] = useState(0);

  // Home costs
  const [propertyTaxMonthly, setPropertyTaxMonthly] = useState(350);
  const [heatingMonthly, setHeatingMonthly] = useState(150);

  // Mortgage assumptions
  const [contractRatePct, setContractRatePct] = useState(5.0);
  const [useStressTest, setUseStressTest] = useState(true);
  const [amortYears, setAmortYears] = useState(25);

  // Qualification caps
  const gdsCap = 0.39;
  const tdsCap = 0.44;

  // Close flyout on ESC
  useEffect(() => {
    if (!expensesOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setExpensesOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expensesOpen]);

  const derived = useMemo(() => {
    const incomeA = clamp(Number(annualIncome) || 0, 0, 10_000_000);
    const incomeM = incomeA / 12;

    // Simple estimates (common in online calculators)
    const ccEstimatedPayment = (Number(creditCardBalance) || 0) * 0.03; // ~3% of balance
    const locEstimatedPayment = (Number(creditLineLimit) || 0) * 0.03; // ~3% of credit limit

    // "Debts" are monthly obligations (excluding housing costs)
    const debtsM =
      (Number(loanPaymentsMonthly) || 0) +
      ccEstimatedPayment +
      locEstimatedPayment +
      (Number(otherDebtMonthly) || 0);

    // Condo fees: lenders often count 50% in housing costs
    const condoCounted = (Number(condoFeesMonthly) || 0) * 0.5;

    // Non-mortgage housing costs
    const nonMortgageHousingM =
      (Number(propertyTaxMonthly) || 0) +
      (Number(heatingMonthly) || 0) +
      condoCounted;

    // GDS cap limits total housing costs
    const maxHousingByGDS = incomeM * gdsCap;

    // TDS cap limits total obligations (housing + debts)
    const maxTotalByTDS = incomeM * tdsCap;

    // Housing budget remaining after other debts
    const maxHousingByTDS = Math.max(0, maxTotalByTDS - debtsM);

    const housingBudget = Math.max(0, Math.min(maxHousingByGDS, maxHousingByTDS));

    // Mortgage payment is what's left after taxes/heat/condo counted
    const mortgagePaymentBudget = Math.max(0, housingBudget - nonMortgageHousingM);

    const contractRate = (Number(contractRatePct) || 0) / 100;
    const rateUsed = useStressTest ? qualifyingRate(contractRate) : contractRate;

    const maxMortgage = loanFromMonthlyPayment(
      mortgagePaymentBudget,
      rateUsed,
      Number(amortYears) || 25
    );

    const dp = clamp(Number(downPayment) || 0, 0, 100_000_000);
    const estHomePrice = maxMortgage + dp;

    const gds = incomeM > 0 ? housingBudget / incomeM : 0;
    const tds = incomeM > 0 ? (housingBudget + debtsM) / incomeM : 0;

    // What the main Expenses textbox should display.
    // RBC shows a single $ value with a dropdown; we show estimated monthly obligations INCLUDING condo fee (full),
    // because the flyout groups "Other Debt and Condo Fees".
    const expensesDisplayMonthly = Math.max(0, debtsM + (Number(condoFeesMonthly) || 0));

    return {
      incomeM,
      debtsM,
      condoCounted,
      nonMortgageHousingM,
      maxHousingByGDS,
      maxHousingByTDS,
      housingBudget,
      mortgagePaymentBudget,
      rateUsed,
      maxMortgage,
      estHomePrice,
      gds,
      tds,
      expensesDisplayMonthly,
    };
  }, [
    annualIncome,
    creditCardBalance,
    creditLineLimit,
    loanPaymentsMonthly,
    otherDebtMonthly,
    condoFeesMonthly,
    propertyTaxMonthly,
    heatingMonthly,
    contractRatePct,
    useStressTest,
    amortYears,
    downPayment,
  ]);

  // Dev-only tests (basic invariants) — helps prevent regressions
  useEffect(() => {
    const isDev =
      typeof import.meta !== "undefined" &&
      import.meta.env &&
      (import.meta.env.DEV || import.meta.env.MODE === "development");
    if (!isDev) return;

    // qualifyingRate
    console.assert(Math.abs(qualifyingRate(0.04) - 0.06) < 1e-9, "qualifyingRate: contract+2% should win");
    console.assert(Math.abs(qualifyingRate(0.03) - 0.0525) < 1e-9, "qualifyingRate: 5.25% floor should win");

    // loanFromMonthlyPayment
    console.assert(loanFromMonthlyPayment(0, 0.05, 25) === 0, "loanFromMonthlyPayment: 0 payment => 0 loan");

    const base = loanFromMonthlyPayment(1000, 0.06, 25);
    const higherPay = loanFromMonthlyPayment(1200, 0.06, 25);
    console.assert(base > 0, "loanFromMonthlyPayment: should be positive");
    console.assert(higherPay > base, "loanFromMonthlyPayment: higher payment => higher loan");

    const lowerRate = loanFromMonthlyPayment(1000, 0.04, 25);
    console.assert(lowerRate > base, "loanFromMonthlyPayment: lower rate => higher loan");
  }, []);

  function next() {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function back() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  const step = steps[stepIndex];

  const StepPill = ({ active, done, children }) => (
    <div
      className={[
        "flex items-center gap-2 rounded-full px-3 py-1 text-sm",
        active ? "bg-brand text-white" : done ? "bg-brand/10 text-brand" : "bg-black/5 text-muted",
      ].join(" ")}
    >
      <span className={["h-2 w-2 rounded-full", active ? "bg-white" : done ? "bg-brand" : "bg-black/25"].join(" ")} />
      <span className="whitespace-nowrap">{children}</span>
    </div>
  );

  const Field = ({ label, hint, children }) => (
    <div className="grid gap-1">
      <div className="flex items-end justify-between gap-3">
        <div className="text-sm font-semibold text-text">{label}</div>
        {hint ? <div className="text-xs text-muted">{hint}</div> : null}
      </div>
      {children}
    </div>
  );

      const CurrencyInput = ({ value, onChange, prefix = "$", suffix, min, max }) => {
    // IMPORTANT UX NOTE:
    // Re-formatting (adding commas) on every keystroke causes the cursor to jump,
    // which feels like you must "click again and again".
    // So we:
    // - Let the user type raw digits smoothly while focused
    // - Format with commas only on blur
    const [isFocused, setIsFocused] = useState(false);
    const [draft, setDraft] = useState("");

    // Keep draft in sync when not editing
    useEffect(() => {
      if (isFocused) return;
      const n = Number(value);
      if (!Number.isFinite(n) || n === 0) {
        setDraft("0");
        return;
      }
      setDraft(Math.round(n).toLocaleString("en-CA"));
    }, [value, isFocused]);

    return (
      <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 shadow-sm">
        {prefix ? <span className="text-sm text-muted">{prefix}</span> : null}
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className="w-full bg-transparent text-sm outline-none"
          value={isFocused ? draft : draft}
          onFocus={(e) => {
            setIsFocused(true);
            // Show digits only while editing (no commas)
            const digits = String(draft || "").replace(/[^0-9]/g, "");
            setDraft(digits);
            // Optional: place cursor at end
            requestAnimationFrame(() => {
              try {
                const len = e.target.value.length;
                e.target.setSelectionRange(len, len);
              } catch {}
            });
          }}
          onChange={(e) => {
            const raw = String(e.target.value || "");
            const digits = raw.replace(/[^0-9]/g, "");
            setDraft(digits);
          }}
          onBlur={() => {
            setIsFocused(false);
            const digits = String(draft || "").replace(/[^0-9]/g, "");
            const num = digits === "" ? 0 : Number(digits);
            const clamped =
              typeof min === "number" && typeof max === "number"
                ? clamp(num, min, max)
                : num;
            onChange(clamped);
            // Format for display
            if (!Number.isFinite(clamped) || clamped === 0) {
              setDraft("0");
            } else {
              setDraft(Math.round(clamped).toLocaleString("en-CA"));
            }
          }}
        />
        {suffix ? <span className="text-sm text-muted">{suffix}</span> : null}
      </div>
    );
  };

    const PercentInput = ({ value, onChange, min = 0, max = 25 }) => {
    // Same UX approach: don't aggressively reformat while typing.
    const [isFocused, setIsFocused] = useState(false);
    const [draft, setDraft] = useState("");

    useEffect(() => {
      if (isFocused) return;
      const n = Number(value);
      setDraft(!Number.isFinite(n) ? "0" : String(n));
    }, [value, isFocused]);

    return (
      <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 shadow-sm">
        <input
          type="text"
          inputMode="decimal"
          autoComplete="off"
          className="w-full bg-transparent text-sm outline-none"
          value={draft}
          onFocus={(e) => {
            setIsFocused(true);
            requestAnimationFrame(() => {
              try {
                const len = e.target.value.length;
                e.target.setSelectionRange(len, len);
              } catch {}
            });
          }}
          onChange={(e) => {
            const raw = String(e.target.value || "");
            const cleaned = raw.replace(/[^0-9.]/g, "");
            const parts = cleaned.split(".");
            const normalized = parts.length <= 2 ? cleaned : parts[0] + "." + parts.slice(1).join("");
            setDraft(normalized);
          }}
          onBlur={() => {
            setIsFocused(false);
            const raw = String(draft || "");
            const cleaned = raw.replace(/[^0-9.]/g, "");
            const num = cleaned === "" || cleaned === "." ? 0 : Number(cleaned);
            const clamped = clamp(num, min, max);
            onChange(clamped);
            setDraft(String(clamped));
          }}
        />
        <span className="text-sm text-muted">%</span>
      </div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-3xl border border-black/10 bg-white shadow-sm">
        <div className="border-b border-black/10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xl font-extrabold tracking-tight text-text">Mortgage Affordability Calculator</div>
              <div className="mt-1 text-sm text-muted">
                {/* Enter a few details and we’ll estimate the maximum monthly housing cost you can afford. */}
                Looking to buy a home? Enter a few basic details about your finances and our Mortgage Affordability Calculator will show the maximum monthly housing cost you can afford — including mortgage payment, property taxes, heating costs and more.
              </div>
            </div>

            {/* <div className="flex flex-wrap gap-2">
              {steps.map((s, idx) => (
                <StepPill key={s.id} active={idx === stepIndex} done={idx < stepIndex}>
                  {s.title}
                </StepPill>
              ))}
            </div> */}
          </div>
        </div>

        <div className="p-6">
          {step.id === "income" && (
            <div className="grid gap-6 md:grid-cols-3">
              <Field label="Income" hint="Annual household income">
                <CurrencyInput value={annualIncome} onChange={setAnnualIncome} min={1000} max={1000000} />
              </Field>

              <div className="relative">
                <Field label="Expenses">
                  <button
                    type="button"
                    onClick={() => setExpensesOpen(true)}
                    className="flex w-full items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 text-left text-sm shadow-sm hover:border-black/20"
                    aria-haspopup="dialog"
                    aria-expanded={expensesOpen}
                  >
                    <span className="text-sm text-muted">$</span>
                    <span className="flex-1 text-sm text-text">
                      {Math.round(derived.expensesDisplayMonthly) <= 0
                        ? "0"
                        : String(Math.round(derived.expensesDisplayMonthly))}
                    </span>
                    <span className="text-muted">▾</span>
                  </button>
                </Field>

                {expensesOpen && (
                  <>
                    {/* Backdrop */}
                    <button
                      type="button"
                      className="fixed inset-0 z-40 cursor-default bg-black/10"
                      onClick={() => {
                            setExpensesOpen(false);
                            // Show results immediately after user confirms Expenses (RBC-style)
                            setStepIndex(2);
                          }}
                      aria-label="Close expenses"
                    />

                    {/* Panel */}
                    <div className="absolute right-0 top-full z-50 mt-2 w-full min-w-[320px] max-w-[380px] rounded-2xl border border-black/10 bg-white p-4 shadow-xl">
                      <div className="flex items-start justify-between gap-3">
                        {/* <div>
                          <div className="text-sm font-bold text-text">Expenses</div>
                          <div className="mt-0.5 text-xs text-muted">Add your debts and monthly fees</div>
                        </div> */}
                        <button
                          type="button"
                          className="rounded-lg px-2 py-1 text-sm text-muted hover:bg-black/5"
                          onClick={() => setExpensesOpen(false)}
                          aria-label="Close"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="mt-4 grid gap-4">
                        <Field label="Loans">
                          <CurrencyInput value={loanPaymentsMonthly} onChange={setLoanPaymentsMonthly} min={0} max={50000} />
                        </Field>

                        <Field label="Credit Card(s) (total balance)">
                          <CurrencyInput value={creditCardBalance} onChange={setCreditCardBalance} min={0} max={500000} />
                        </Field>

                        <Field label="Credit Line(s) (total credit limit)">
                          <CurrencyInput value={creditLineLimit} onChange={setCreditLineLimit} min={0} max={500000} />
                        </Field>

                        <div className="grid gap-3">
                          {/* <div className="flex items-center justify-between">
                            <div className="text-sm font-semibold text-text">Other Debt and Condo Fees</div>
                            <span className="text-xs text-muted">(condo: 50% counted)</span>
                          </div> */}
                          <div className="grid gap-3">
                            <Field label="Other debt">
                              <CurrencyInput value={otherDebtMonthly} onChange={setOtherDebtMonthly} min={0} max={50000} />
                            </Field>
                            <Field label="Condo fees">
                              <CurrencyInput value={condoFeesMonthly} onChange={setCondoFeesMonthly} min={0} max={50000} />
                            </Field>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            // Close the flyout and jump straight to Results (RBC-style)
                            setExpensesOpen(false);
                            setStepIndex(2);
                          }}
                          className="mt-2 w-full rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand/90"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <Field label="Down payment">
                <CurrencyInput value={downPayment} onChange={setDownPayment} min={1000} max={5000000} />
              </Field>
{/* 
              <div className="rounded-3xl bg-brand/5 p-5 md:col-span-3">
                <div className="text-sm font-semibold text-text">Preview</div>
                <div className="mt-2 grid gap-2 text-sm text-muted md:grid-cols-3">
                  <div>
                    <div className="text-xs uppercase tracking-wide">Gross monthly income</div>
                    <div className="mt-1 text-base font-bold text-text">{money(derived.incomeM)}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide">Estimated debts</div>
                    <div className="mt-1 text-base font-bold text-text">{money(derived.debtsM)}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide">Qualifying rate</div>
                    <div className="mt-1 text-base font-bold text-text">{(derived.rateUsed * 100).toFixed(2)}%</div>
                  </div>
                </div>
              </div> */}
            </div>
          )}

          {step.id === "home" && (
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Property taxes (monthly)">
                <CurrencyInput value={propertyTaxMonthly} onChange={setPropertyTaxMonthly} min={0} max={5000} />
              </Field>
              <Field label="Heating cost (monthly)">
                <CurrencyInput value={heatingMonthly} onChange={setHeatingMonthly} min={0} max={2000} />
              </Field>

              <div className="grid gap-4 rounded-3xl border border-black/10 bg-white p-5 md:col-span-2">
                <div className="grid gap-4 md:grid-cols-3">
                  <Field label="Interest rate (contract)">
                    <PercentInput value={contractRatePct} onChange={setContractRatePct} min={0} max={25} />
                  </Field>

                  <Field label="Amortization">
                    <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 shadow-sm">
                      <select
                        className="w-full bg-transparent text-sm outline-none"
                        value={amortYears}
                        onChange={(e) => setAmortYears(Number(e.target.value))}
                      >
                        {[15, 20, 25, 30].map((y) => (
                          <option key={y} value={y}>
                            {y} years
                          </option>
                        ))}
                      </select>
                    </div>
                  </Field>

                  <Field label="Stress test?">
                    <button
                      type="button"
                      onClick={() => setUseStressTest((v) => !v)}
                      className={[
                        "flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-sm shadow-sm",
                        useStressTest ? "border-brand bg-brand/10 text-brand" : "border-black/10 bg-white text-text",
                      ].join(" ")}
                    >
                      <span>{useStressTest ? "Yes" : "No"}</span>
                      <span className="text-xs text-muted">{(derived.rateUsed * 100).toFixed(2)}%</span>
                    </button>
                  </Field>
                </div>

                <div className="rounded-3xl bg-brand/5 p-5">
                  <div className="text-sm font-semibold text-text">Housing costs counted (monthly)</div>
                  <div className="mt-2 grid gap-2 text-sm text-muted md:grid-cols-3">
                    <div>
                      <div className="text-xs uppercase tracking-wide">Taxes</div>
                      <div className="mt-1 font-bold text-text">{money(Number(propertyTaxMonthly) || 0)}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide">Heat</div>
                      <div className="mt-1 font-bold text-text">{money(Number(heatingMonthly) || 0)}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide">Condo (50%)</div>
                      <div className="mt-1 font-bold text-text">{money((Number(condoFeesMonthly) || 0) * 0.5)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step.id === "results" && (
            <div className="grid gap-6">
              {/* Keep the 3 inputs visible on Results (RBC-style) */}
              <div className="grid gap-6 rounded-3xl border border-black/10 bg-white p-5 md:grid-cols-3">
                <Field label="Income" hint="Annual household income">
                  <CurrencyInput value={annualIncome} onChange={setAnnualIncome} min={1000} max={1000000} />
                </Field>

                <div className="relative">
                  <Field label="Expenses" >
                    <button
                      type="button"
                      onClick={() => setExpensesOpen(true)}
                      className="flex w-full items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 text-left text-sm shadow-sm hover:border-black/20"
                      aria-haspopup="dialog"
                      aria-expanded={expensesOpen}
                    >
                      <span className="text-sm text-muted">$</span>
                      <span className="flex-1 text-sm text-text">
                        {Math.round(derived.expensesDisplayMonthly) <= 0
                          ? "0"
                          : String(Math.round(derived.expensesDisplayMonthly))}
                      </span>
                      <span className="text-muted">▾</span>
                    </button>
                  </Field>

                  {expensesOpen && (
                    <>
                      <button
                        type="button"
                        className="fixed inset-0 z-40 cursor-default bg-black/10"
                        onClick={() => setExpensesOpen(false)}
                        aria-label="Close expenses"
                      />

                      <div className="absolute right-0 top-full z-50 mt-2 w-full min-w-[320px] max-w-[380px] rounded-2xl border border-black/10 bg-white p-4 shadow-xl">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-bold text-text">Expenses</div>
                            <div className="mt-0.5 text-xs text-muted">Add your debts and monthly fees</div>
                          </div>
                          <button
                            type="button"
                            className="rounded-lg px-2 py-1 text-sm text-muted hover:bg-black/5"
                            onClick={() => setExpensesOpen(false)}
                            aria-label="Close"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="mt-4 grid gap-4">
                          <Field label="Loans" >
                            <CurrencyInput value={loanPaymentsMonthly} onChange={setLoanPaymentsMonthly} min={0} max={50000} />
                          </Field>

                          <Field label="Credit Card(s) (total balance)" >
                            <CurrencyInput value={creditCardBalance} onChange={setCreditCardBalance} min={0} max={500000} />
                          </Field>

                          <Field label="Credit Line(s) (total credit limit)">
                            <CurrencyInput value={creditLineLimit} onChange={setCreditLineLimit} min={0} max={500000} />
                          </Field>

                          <div className="grid gap-3">
                            {/* <div className="flex items-center justify-between">
                              <div className="text-sm font-semibold text-text">Other Debt and Condo Fees</div>
                              <span className="text-xs text-muted"></span>
                            </div> */}
                            <div className="grid gap-3">
                              <Field label="Other debt" >
                                <CurrencyInput value={otherDebtMonthly} onChange={setOtherDebtMonthly} min={0} max={50000} />
                              </Field>
                              <Field label="Condo fees" >
                                <CurrencyInput value={condoFeesMonthly} onChange={setCondoFeesMonthly} min={0} max={50000} />
                              </Field>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setExpensesOpen(false);
                              // already on results
                            }}
                            className="mt-2 w-full rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand/90"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <Field label="Down payment">
                  <CurrencyInput value={downPayment} onChange={setDownPayment} min={1000} max={5000000} />
                </Field>
              </div>
              <div className="grid gap-6 md:grid-cols-2 md:gap-10">
                {/* LEFT: Purchase budget summary */}
                <div className="rounded-3xl bg-white p-2">
                  <div className="text-xl font-semibold text-text">
                    How much can I comfortably spend on my home purchase?
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand" aria-hidden="true">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 10.5L12 3l9 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.5 9.8V21h13V9.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.5 21v-7h5v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>

                    <div className="text-4xl font-extrabold tracking-tight text-text">
                      {money(derived.estHomePrice)}
                    </div>
                  </div>

                  <div className="mt-5 text-sm text-muted">
                    Your mortgage amount would be <span className="font-semibold text-text">{money(derived.maxMortgage)}</span>.
                  </div>

                  <div className="mt-2 text-sm text-muted">
                    Tip: Don’t forget to set aside approximately <span className="font-semibold text-text">3%</span> for closing costs.
                  </div>
{/* 
                  <div className="mt-6 rounded-3xl bg-black/5 p-5">
                    <div className="grid gap-2 text-sm">
                      <div className="flex items-center justify-between gap-6">
                        <span className="text-muted">Max monthly housing cost</span>
                        <span className="font-bold text-text">{money(derived.housingBudget)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-6">
                        <span className="text-muted">Non-mortgage housing costs</span>
                        <span className="font-bold text-text">{money(derived.nonMortgageHousingM)}</span>
                      </div>
                      <div className="flex items-center justify-between gap-6">
                        <span className="text-muted">Estimated debts (monthly)</span>
                        <span className="font-bold text-text">{money(derived.debtsM)}</span>
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* RIGHT: Payment + payment details */}
                <div className="relative rounded-3xl bg-white p-2">
                  <div className="pointer-events-none absolute -left-5 top-0 hidden h-full w-px bg-black/10 md:block" />

                  <div className="text-xl font-semibold text-text text-center md:text-left">
                    My monthly mortgage payment will be...
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-4 md:justify-start">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand" aria-hidden="true">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 7.5h15a2 2 0 012 2v7a2 2 0 01-2 2h-13a2 2 0 01-2-2v-9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                        <path d="M3.5 7.5a2 2 0 012-2h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <path d="M17.5 12.2h3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        <circle cx="17.5" cy="12.2" r="1" fill="currentColor"/>
                      </svg>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <div className="text-4xl font-extrabold tracking-tight text-text">
                        {money(derived.mortgagePaymentBudget)}
                      </div>
                      <div className="text-sm text-muted">/month</div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="text-base font-semibold text-text">Payment Details</div>

                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <div className="text-sm font-semibold text-text">Mortgage free in:</div>
                        <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2 shadow-sm">
                          <select
                            className="w-full bg-transparent text-sm outline-none"
                            value={amortYears}
                            onChange={(e) => setAmortYears(Number(e.target.value))}
                          >
                            {[15, 20, 25, 30].map((y) => (
                              <option key={y} value={y}>
                                {y} years
                              </option>
                            ))}
                          </select>
                          <span className="text-muted">▾</span>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <div className="text-sm font-semibold text-text">Interest rate:</div>
                        <PercentInput value={contractRatePct} onChange={setContractRatePct} min={0} max={25} />
                      </div>
                    </div>

                    <details className="mt-6 rounded-2xl border border-black/10 bg-white p-4">
                      <summary className="cursor-pointer select-none text-sm font-semibold text-brand">
                        + Assumptions
                      </summary>
                      <div className="mt-4 grid gap-4">
                        <div className="grid gap-2">
                          <div className="text-sm font-semibold text-text">Property taxes (monthly)</div>
                          <CurrencyInput value={propertyTaxMonthly} onChange={setPropertyTaxMonthly} min={0} max={5000} />
                        </div>
                        <div className="grid gap-2">
                          <div className="text-sm font-semibold text-text">Heating cost (monthly)</div>
                          <CurrencyInput value={heatingMonthly} onChange={setHeatingMonthly} min={0} max={2000} />
                        </div>
                        {/* <div className="grid gap-2">
                          <div className="text-sm font-semibold text-text">Condo fees (monthly)</div>
                          <CurrencyInput value={condoFeesMonthly} onChange={setCondoFeesMonthly} min={0} max={50000} />
                          <div className="text-xs text-muted">We count 50% of condo fees as a housing cost.</div>
                        </div> */}

                        {/* <div className="flex items-center justify-between gap-4 rounded-2xl bg-black/5 p-3">
                          <div>
                            <div className="text-sm font-semibold text-text">Stress test</div>
                            <div className="text-xs text-muted">Qualifying rate used: {(derived.rateUsed * 100).toFixed(2)}%</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setUseStressTest((v) => !v)}
                            className={[
                              "rounded-xl px-3 py-2 text-sm font-semibold",
                              useStressTest ? "bg-brand text-white" : "bg-white border border-black/10 text-text",
                            ].join(" ")}
                          >
                            {useStressTest ? "On" : "Off"}
                          </button>
                        </div> */}

                        {/* <div className="grid gap-2 text-sm">
                          <div className="flex items-center justify-between gap-6">
                            <span className="text-muted">GDS at max</span>
                            <span className="font-bold text-text">{pct(derived.gds)}</span>
                          </div>
                          <div className="flex items-center justify-between gap-6">
                            <span className="text-muted">TDS at max</span>
                            <span className="font-bold text-text">{pct(derived.tds)}</span>
                          </div>
                        </div> */}
                      </div>
                    </details>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white p-5 text-xs text-muted">
                Notes: This is an estimate only. Lenders may calculate obligations differently.
              </div>
            </div>
          )}
        </div>

        {/* <div className="flex items-center justify-between gap-3 border-t border-black/10 p-6">
          <button
            type="button"
            onClick={back}
            disabled={stepIndex === 0}
            className={[
              "rounded-2xl px-4 py-2 text-sm font-semibold",
              stepIndex === 0 ? "bg-black/5 text-black/30" : "bg-black/5 text-text hover:bg-black/10",
            ].join(" ")}
          >
            Back
          </button>

          {step.id !== "results" ? (
            <button
              type="button"
              onClick={next}
              className="rounded-2xl bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand/90"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStepIndex(0)}
              className="rounded-2xl bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand/90"
            >
              Start Over
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
}
