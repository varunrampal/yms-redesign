import React, { useMemo, useState } from "react";

function currency(n) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(n) ? n : 0);
}

function parseAmount(value) {
  if (!value) return 0;
  const cleaned = String(value).replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  return Number.isFinite(num) ? num : 0;
}

function calculateGST(price, isNewHome) {
  if (!isNewHome || price <= 0) return 0;
  return price * 0.05;
}

function calculateFTHBGSTRebate(price, gst, isNewHome, isFirstTimeBuyer) {
  if (!isNewHome || !isFirstTimeBuyer || price <= 0) return 0;

  // Based on the B.C. Real Estate Lawyers page:
  // - full rebate up to $1,000,000 FMV
  // - partial rebate from $1,000,000 to $1,500,000
  // - no rebate above $1,500,000
  if (price <= 1_000_000) return gst;
  if (price >= 1_500_000) return 0;

  const phaseOutFactor = (1_500_000 - price) / 500_000;
  return gst * phaseOutFactor;
}

function ResultRow({ label, value, strong = false }) {
  return (
    <div className={`flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 ${strong ? "font-semibold" : ""}`}>
      <span className="text-slate-600">{label}</span>
      <span className="text-slate-900">{value}</span>
    </div>
  );
}

export default function BCGstCalculator() {
  const [purchasePrice, setPurchasePrice] = useState("800000");
  const [isNewHome, setIsNewHome] = useState(true);
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(true);

  const values = useMemo(() => {
    const price = parseAmount(purchasePrice);
    const gstBeforeRebate = calculateGST(price, isNewHome);
    const gstRebate = calculateFTHBGSTRebate(price, gstBeforeRebate, isNewHome, isFirstTimeBuyer);
    const gstPayable = Math.max(0, gstBeforeRebate - gstRebate);
    const finalPurchasePrice = price + gstPayable;

    return {
      price,
      gstBeforeRebate,
      gstRebate,
      gstPayable,
      finalPurchasePrice,
    };
  }, [purchasePrice, isNewHome, isFirstTimeBuyer]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          BC Real Estate GST Tool
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          GST Calculator for BC New Homes
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600">
          Calculate 5% GST, first-time home buyer rebate, GST payable after rebate, and final purchase price for new or substantially renovated homes in British Columbia.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Purchase Price
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="Enter purchase price"
                  className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-8 pr-4 text-lg font-medium text-slate-900 outline-none transition focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="mb-3 text-sm font-medium text-slate-700">Is this a new home?</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewHome(true)}
                    className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      isNewHome
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNewHome(false)}
                    className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      !isNewHome
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="mb-3 text-sm font-medium text-slate-700">First-time buyer?</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFirstTimeBuyer(true)}
                    className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      isFirstTimeBuyer
                        ? "bg-blue-600 text-white"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFirstTimeBuyer(false)}
                    className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      !isFirstTimeBuyer
                        ? "bg-blue-600 text-white"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              This calculator is structured around the B.C. Real Estate Lawyers GST page. It applies 5% GST to new or substantially renovated homes, assumes no GST on used residential homes, and applies the first-time home buyer rebate scale up to $1.5M.
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
          <div className="space-y-3">
            <ResultRow label="Purchase Price" value={currency(values.price)} strong />
            <ResultRow label="GST Paid at Time of Purchase" value={currency(values.gstBeforeRebate)} />
            <ResultRow label="GST Rebate" value={`- ${currency(values.gstRebate)}`} />
            <ResultRow label="GST Payable After Rebate" value={currency(values.gstPayable)} strong />
            <div className="my-4 border-t border-dashed border-slate-300" />
            <div className="rounded-2xl bg-slate-900 px-5 py-4 text-white">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm uppercase tracking-wide text-slate-300">
                  Final Purchase Price Including GST Payable
                </span>
                <span className="text-2xl font-bold">
                  {currency(values.finalPurchasePrice)}
                </span>
              </div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
