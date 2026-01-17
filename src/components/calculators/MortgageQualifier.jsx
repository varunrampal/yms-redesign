import React, { useMemo, useState } from "react";

// ---------- Helpers ----------
const currency0 = (n) =>
    Number.isFinite(n)
        ? n.toLocaleString("en-CA", {
            style: "currency",
            currency: "CAD",
            maximumFractionDigits: 0,
        })
        : "-";

function toNum(v) {
    const n = Number(String(v).replace(/[^\d.]/g, ""));
    return Number.isFinite(n) ? n : 0;
}

function clamp(n, min = 0, max = Infinity) {
    return Math.min(Math.max(n, min), max);
}

function monthlyPayment(principal, annualRatePct, amortYears) {
    const r = annualRatePct / 100 / 12;
    const n = Math.round(amortYears * 12);
    if (principal <= 0 || n <= 0) return 0;
    if (r === 0) return principal / n;
    const pow = Math.pow(1 + r, n);
    return (principal * (r * pow)) / (pow - 1);
}

// Canada stress test (uninsured): greater of contract + 2% OR 5.25%
function qualifyingRateCanada(contractRatePct) {
    return Math.max(contractRatePct + 2, 5.25);
}

// ---------- Optional UI (only if you want to show breakdown later) ----------
function StackedBar({ mortgage, taxes, heating, condo }) {
    const parts = [
        { key: "mortgage", label: "Mortgage", value: mortgage, cls: "segMortgage" },
        { key: "taxes", label: "Taxes", value: taxes, cls: "segTaxes" },
        { key: "heating", label: "Heating", value: heating, cls: "segHeating" },
        { key: "condo", label: "Condo", value: condo, cls: "segCondo" },
    ].filter((p) => p.value > 0);

    const total = parts.reduce((s, p) => s + p.value, 0);
    if (!Number.isFinite(total) || total <= 0) return null;

    return (
        <div className="stackedWrap">
            <div className="stackedBar" aria-label="Monthly housing breakdown">
                {parts.map((p) => (
                    <div
                        key={p.key}
                        className={`stackedSeg ${p.cls}`}
                        style={{ width: `${(p.value / total) * 100}%` }}
                        title={`${p.label}: ${currency0(p.value)}`}
                    />
                ))}
            </div>

            <div className="stackLegend">
                {parts.map((p) => (
                    <div className="legendItem" key={p.key}>
                        <span className={`legendSwatch ${p.cls}`} />
                        <span>{p.label}: </span>
                        <b>{currency0(p.value)}</b>
                    </div>
                ))}
            </div>

            <p className="stackTotal">
                Total housing costs: <b>{currency0(total)}</b> / month
            </p>
        </div>
    );
}

export default function MortgageQualifier() {
    const [isAdvanced, setIsAdvanced] = useState(false);

    // Simple inputs
    const [incomeAnnual, setIncomeAnnual] = useState(120000);
    const [monthlyDebts, setMonthlyDebts] = useState(500);
    const [downPayment, setDownPayment] = useState(100000);
    const [contractRate, setContractRate] = useState(5.5);

    // Slider amortization
    const [amortYears, setAmortYears] = useState(25);

    // Advanced housing costs
    const [propertyTaxMonthly, setPropertyTaxMonthly] = useState(350);
    const [heatingMonthly, setHeatingMonthly] = useState(120);
    const [condoFeesMonthly, setCondoFeesMonthly] = useState(0);

    // Limits (kept internal, defaults)
    const [gdsMax] = useState(0.39);
    const [tdsMax] = useState(0.44);

    const results = useMemo(() => {
        const incAnnual = clamp(toNum(incomeAnnual), 0, 10_000_000);
        const incMonthly = incAnnual / 12;

        const debts = clamp(toNum(monthlyDebts), 0, 100_000);
        const down = clamp(toNum(downPayment), 0, 10_000_000);

        const contract = clamp(toNum(contractRate), 0, 50);
        const amort = clamp(toNum(amortYears), 1, 40);

        const qRate = qualifyingRateCanada(contract);

        const tax = isAdvanced ? clamp(toNum(propertyTaxMonthly), 0, 100_000) : 0;
        const heat = isAdvanced ? clamp(toNum(heatingMonthly), 0, 100_000) : 0;
        const condo = isAdvanced ? clamp(toNum(condoFeesMonthly), 0, 100_000) : 0;

        const gdsLimit = isAdvanced ? clamp(toNum(gdsMax), 0, 1) : 0.39;
        const tdsLimit = isAdvanced ? clamp(toNum(tdsMax), 0, 1) : 0.44;

        if (incMonthly <= 0) {
            return { ok: false, qRate, reason: "Please enter your annual household income." };
        }

        const maxHousingByGDS = incMonthly * gdsLimit;
        const maxHousingByTDS = incMonthly * tdsLimit - debts;
        const maxHousing = Math.min(maxHousingByGDS, maxHousingByTDS);

        const maxMortgagePayment = maxHousing - (tax + heat + condo);

        if (maxMortgagePayment <= 0) {
            return {
                ok: false,
                qRate,
                reason:
                    "Based on these inputs, there isn’t enough room within GDS/TDS limits for a mortgage payment.",
            };
        }

        // Solve for max mortgage principal (binary search)
        let lo = 0;
        let hi = 7_000_000;
        for (let i = 0; i < 45; i++) {
            const mid = (lo + hi) / 2;
            const pmt = monthlyPayment(mid, qRate, amort);
            if (pmt <= maxMortgagePayment) lo = mid;
            else hi = mid;
        }

        const maxMortgage = lo;
        const maxHomePrice = maxMortgage + down;

        const qualifyingMortgagePmt = monthlyPayment(maxMortgage, qRate, amort);
        const realMortgagePmt = monthlyPayment(maxMortgage, contract, amort);

        return {
            ok: true,
            qRate,
            incMonthly,
            debts,
            down,
            amort,
            maxMortgage,
            maxHomePrice,
            qualifyingMortgagePmt,
            realMortgagePmt,
            tax,
            heat,
            condo,
            gdsLimit,
            tdsLimit,
        };
    }, [
        isAdvanced,
        incomeAnnual,
        monthlyDebts,
        downPayment,
        contractRate,
        amortYears,
        propertyTaxMonthly,
        heatingMonthly,
        condoFeesMonthly,
        gdsMax,
        tdsMax,
    ]);

    const closingRate = 0.03;
    const estClosingCosts = results.ok ? results.maxHomePrice * closingRate : 0;
    const cashNeededAtClose = results.ok ? results.down + estClosingCosts : 0;

    return (
        <>
            {/* Same header style you’re using */}
            <div className="container">
                <div className="session-title row">
                    <h2>Mortgage Affordability Calculator</h2>
                    <p>
                        Looking to buy a home? Enter a few basic details about your finances and our Mortgage
                        Affordability Calculator will show the maximum monthly housing cost you can afford —
                        including mortgage payment, property taxes, heating costs and more.
                    </p>
                </div>
                {/* <div className="heading-line"></div> */}
            </div>

            <div id="qualifier" className="mortgage-container mt-5">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="formCard">
                            <div className="formHeader">
                                <div>
                                    <p className="formKicker">Your Details</p>
                                    <h3 className="formTitle">Enter your numbers</h3>
                                </div>
                                <span className="modePill">{isAdvanced ? "Advanced" : "Simple"}</span>
                            </div>

                            <div className="formGrid">
                                <div className="form-field">
                                    <label>Annual household income (gross)</label>
                                    <div className="inputWrap">
                                        <span className="inputIcon">$</span>
                                        <input
                                            type="number"
                                            value={incomeAnnual}
                                            onChange={(e) => setIncomeAnnual(e.target.value)}
                                            min="0"
                                            placeholder="120000"
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Monthly debt payments</label>
                                    <div className="inputWrap">
                                        <span className="inputIcon">$</span>
                                        <input
                                            type="number"
                                            value={monthlyDebts}
                                            onChange={(e) => setMonthlyDebts(e.target.value)}
                                            min="0"
                                            placeholder="500"
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Down payment</label>
                                    <div className="inputWrap">
                                        <span className="inputIcon">$</span>
                                        <input
                                            type="number"
                                            value={downPayment}
                                            onChange={(e) => setDownPayment(e.target.value)}
                                            min="0"
                                            placeholder="100000"
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Interest rate (contract %)</label>
                                    <div className="inputWrap">
                                        <span className="inputIcon">%</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={contractRate}
                                            onChange={(e) => setContractRate(e.target.value)}
                                            min="0"
                                            placeholder="5.50"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="rangeCard">
                                <div className="rangeTop">
                                    <label className="rangeLabel">
                                        Amortization: <b>{amortYears}</b> years
                                    </label>
                                    <span className="rangeBadge">{amortYears} yrs</span>
                                </div>
                                <input
                                    className="rangeInput"
                                    type="range"
                                    min="5"
                                    max="40"
                                    step="1"
                                    value={amortYears}
                                    onChange={(e) => setAmortYears(Number(e.target.value))}
                                />
                                <div className="rangeTicks">
                                    <span>5</span>
                                    <span>40</span>
                                </div>
                            </div>

                            <div className="advancedCard">
                                <button
                                    type="button"
                                    className="toggle-btn"
                                    onClick={() => setIsAdvanced((v) => !v)}
                                >
                                    {isAdvanced ? "Switch to Simple" : "Switch to Advanced"}
                                </button>

                                {isAdvanced && (
                                    <div className="advanced-grid">
                                        <div className="form-field">
                                            <label>Property taxes (monthly)</label>
                                            <div className="inputWrap">
                                                <span className="inputIcon">$</span>
                                                <input
                                                    type="number"
                                                    value={propertyTaxMonthly}
                                                    onChange={(e) => setPropertyTaxMonthly(e.target.value)}
                                                    min="0"
                                                    placeholder="350"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-field">
                                            <label>Heating (monthly)</label>
                                            <div className="inputWrap">
                                                <span className="inputIcon">$</span>
                                                <input
                                                    type="number"
                                                    value={heatingMonthly}
                                                    onChange={(e) => setHeatingMonthly(e.target.value)}
                                                    min="0"
                                                    placeholder="120"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-field">
                                            <label>Condo fees (monthly)</label>
                                            <div className="inputWrap">
                                                <span className="inputIcon">$</span>
                                                <input
                                                    type="number"
                                                    value={condoFeesMonthly}
                                                    onChange={(e) => setCondoFeesMonthly(e.target.value)}
                                                    min="0"
                                                    placeholder="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="col-lg-5 mt-5">
                        <div className="resultsCard">
                            <div className="resultsHeader">
                                <div>
                                    <p className="resultsKicker">Mortgage Affordability</p>
                                    <h3 className="resultsTitle">How much can I comfortably spend?</h3>
                                </div>
                                {results.ok && (
                                    <span className="ratePill">
                                        Qualifying: <b>{results.qRate?.toFixed?.(2)}%</b>
                                    </span>
                                )}
                            </div>

                            {!results.ok ? (
                                <div className="resultsEmpty">
                                    <p className="resultError">{results.reason}</p>
                                </div>
                            ) : (
                                <>
                                    {/* Highlight */}
                                    <div className="resultsHero">
                                        <div className="heroLabel">Max home price (estimate)</div>
                                        <div className="heroValue">{currency0(results.maxHomePrice)}</div>
                                        <div className="heroSub">
                                            Mortgage: <b>{currency0(results.maxMortgage)}</b> · Payment:{" "}
                                            <b>{currency0(results.realMortgagePmt)}</b>/mo
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="resultsList">
                                        <div className="resultRow">
                                            <span>Max mortgage (estimate)</span>
                                            <b>{currency0(results.maxMortgage)}</b>
                                        </div>

                                        <div className="resultRow">
                                            <span>Mortgage payment (monthly)</span>
                                            <b>{currency0(results.realMortgagePmt)}</b>
                                        </div>

                                        <div className="resultRow">
                                            <span>Estimated closing costs (3%)</span>
                                            <b>{currency0(estClosingCosts)}</b>
                                        </div>

                                        <div className="resultRow emphasis">
                                            <span>Cash needed at closing</span>
                                            <b>{currency0(cashNeededAtClose)}</b>
                                        </div>
                                    </div>

                                    <div className="resultsNote">
                                        <span className="dot" />
                                        Estimates only. Final approval depends on lender, credit, and property details.
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
