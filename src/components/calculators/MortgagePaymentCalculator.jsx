import React, { useState, useRef, useEffect, useMemo } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import AmortizationChart from "./AmortizationChart.jsx";
import logoPng from "../../assets/logo-colour.png";

// Helpers
const currency2 = (n) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-CA", { style: "currency", currency: "CAD" })
    : "-";

async function toDataURL(url) {
  const res = await fetch(url);
  const blob = await res.blob();
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}


export default function MortgagePaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState(25);
  const [frequency, setFrequency] = useState("Monthly");
  const [payment, setPayment] = useState(null);
  const [totalPaid, setTotalPaid] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const chartRef = useRef(null);

  const toggleSection = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    if (isExpanded) {
      document
        .getElementById("amortization-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isExpanded]);

  const calculateMortgage = () => {
    const principal = parseFloat(loanAmount || 0) - (parseFloat(downPayment) || 0);
    const rate = parseFloat(interestRate || 0) / 100;

    // Keep your original behavior:
    // Monthly -> 12, Bi-Monthly -> 26
    const paymentsPerYear = frequency === "Monthly" ? 12 : 26;

    if (principal > 0 && rate && loanTerm && paymentsPerYear) {
      const periodicRate = rate / paymentsPerYear;
      const totalPayments = loanTerm * paymentsPerYear;
      const factor = Math.pow(1 + periodicRate, totalPayments);

      const periodicPayment = (principal * factor * periodicRate) / (factor - 1);
      const fixedPayment = parseFloat(periodicPayment.toFixed(2));

      setPayment(fixedPayment.toFixed(2));
      setTotalPaid((fixedPayment * totalPayments).toFixed(2));

      // Amortization schedule
      let balance = principal;
      const amortization = [];

      for (let i = 1; i <= totalPayments; i++) {
        const interestPayment = balance * periodicRate;
        const principalPayment = fixedPayment - interestPayment;
        balance -= principalPayment;

        amortization.push({
          paymentNumber: i,
          interestPaid: interestPayment.toFixed(2),
          principalPaid: principalPayment.toFixed(2),
          remainingBalance: balance > 0 ? balance.toFixed(2) : "0.00",
        });

        if (balance <= 0) break;
      }

      setSchedule(amortization);
    } else {
      setPayment(null);
      setTotalPaid(null);
      setSchedule([]);
      setIsExpanded(false);
    }
  };

  const downloadPDF = async () => {
    const doc = new jsPDF();

    // const logoUrl = "https://themortgages.net//logo-main-transparent.png";
    // doc.addImage(logoUrl, "PNG", 14, 10, 40, 20);

    const logoDataUrl = await toDataURL(logoPng);
doc.addImage(logoDataUrl, "PNG", 14, 10, 40, 20);

    doc.setFontSize(18);
    doc.text("Mortgage Summary", 14, 50);

    doc.setFontSize(12);
    doc.text(`Loan Amount: $${loanAmount}`, 14, 60);
    doc.text(`Down Payment: $${downPayment || "0"}`, 14, 68);
    doc.text(`Interest Rate: ${interestRate}%`, 14, 76);
    doc.text(`Amortization Period: ${loanTerm} years`, 14, 84);
    doc.text(`Payment Frequency: ${frequency}`, 14, 92);
    doc.text(`Payment: $${payment}`, 14, 100);
    doc.text(`Total Paid: $${totalPaid}`, 14, 108);

    // Optional: chart image
    // if (chartRef.current) {
    //   const canvas = await html2canvas(chartRef.current);
    //   const imgData = canvas.toDataURL("image/png");
    //   doc.addImage(imgData, "PNG", 14, 115, 180, 80);
    // }

    autoTable(doc, {
      startY: 118,
      head: [["#", "Interest", "Principal", "Remaining Balance"]],
      body: schedule.map((row) => [
        row.paymentNumber,
        `$${row.interestPaid}`,
        `$${row.principalPaid}`,
        `$${row.remainingBalance}`,
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [0, 145, 224] },
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text("Gaurav Sharma | 2961 Townline Rd, Abbotsford, BC, Canada", 14, pageHeight - 20);
    doc.text("Email: sgavin.sharma@ymscanada.ca | Phone: 1-604-217-2992", 14, pageHeight - 14);

    doc.save("Mortgage_Amortization_Schedule.pdf");
  };

  const principalComputed = useMemo(() => {
    const p = parseFloat(loanAmount || 0) - (parseFloat(downPayment) || 0);
    return Number.isFinite(p) ? p : 0;
  }, [loanAmount, downPayment]);

  return (
    <>
      <div className="container">
        <div className="session-title row">
          <h2>Mortgage Payment Calculator</h2>
          <p>Quickly see what your mortgage payments might look like.</p>
        </div>
        <div className="heading-line"></div>
      </div>

      <div id="calculator" className="mortgage-container mt-5">
        <div className="row g-4">
          {/* LEFT: Form */}
          <div className="col-lg-7">
            <div className="formCard">
              <div className="formHeader">
                <div>
                  <p className="formKicker">Payment Details</p>
                  <h3 className="formTitle">Enter your mortgage inputs</h3>
                </div>
                <span className="modePill">
                  {frequency === "Monthly" ? "Monthly" : "Bi-Monthly"}
                </span>
              </div>

              <div className="formGrid">
                <div className="form-field">
                  <label>Loan Amount</label>
                  <div className="inputWrap">
                    <span className="inputIcon">$</span>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="500000"
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Down Payment (optional)</label>
                  <div className="inputWrap">
                    <span className="inputIcon">$</span>
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      placeholder="100000"
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Interest Rate</label>
                  <div className="inputWrap">
                    <span className="inputIcon">%</span>
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="5.50"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Payment Frequency</label>
                  <div className="selectWrap">
                    <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                      <option value="Monthly">Monthly</option>
                      <option value="Bi-Monthly">Bi-Monthly</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="rangeCard">
                <div className="rangeTop">
                  <label className="rangeLabel">
                    Amortization: <b>{loanTerm}</b> years
                  </label>
                  <span className="rangeBadge">{loanTerm} yrs</span>
                </div>

                <input
                  className="rangeInput"
                  type="range"
                  min="1"
                  max="30"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                />

                <div className="rangeTicks">
                  <span>1</span>
                  <span>30</span>
                </div>
              </div>

              <button className="primaryActionBtn" onClick={calculateMortgage}>
                Calculate
              </button>

              <div className="calcHint">
                <span className="dot" />
                Principal after down payment: <b>{currency2(principalComputed)}</b>
              </div>
            </div>
          </div>

          {/* RIGHT: Results */}
          <div className="col-lg-5">
            <div className="resultsCard">
              <div className="resultsHeader">
                <div>
                  <p className="resultsKicker">Your Results</p>
                  <h3 className="resultsTitle">Estimated payments</h3>
                </div>
                {payment && (
                  <span className="ratePill">
                    Rate: <b>{interestRate || "0"}%</b>
                  </span>
                )}
              </div>

              {!payment ? (
                <div className="resultsEmpty">
                  <p className="resultError">
                    Enter your details and click <b>Calculate</b> to see your payment estimate.
                  </p>
                </div>
              ) : (
                <>
                  <div className="resultsHero">
                    <div className="heroLabel">{frequency} payment</div>
                    <div className="heroValue">{currency2(Number(payment))}</div>
                    <div className="heroSub">
                      Total paid over <b>{loanTerm} years</b>:{" "}
                      <b>{currency2(Number(totalPaid))}</b>
                    </div>
                  </div>

                  <div className="resultsList">
                    <div className="resultRow">
                      <span>Principal (after down payment)</span>
                      <b>{currency2(principalComputed)}</b>
                    </div>
                    <div className="resultRow">
                      <span>Payment frequency</span>
                      <b>{frequency}</b>
                    </div>
                    <div className="resultRow">
                      <span>Amortization</span>
                      <b>{loanTerm} years</b>
                    </div>
                  </div>

                  {schedule.length > 0 && (
                    <div className="resultsNote">
                      <span className="dot" />
                      View the amortization schedule below.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Collapsible amortization section */}
        {schedule.length > 0 && (
          <div
            id="amortization-section"
            className="collapsibleWrap mt-4"
          >
            <button className="toggle-btn" onClick={toggleSection}>
              {isExpanded ? "Amortization Details ▲" : "Amortization Details ▼"}
            </button>

            {isExpanded && (
              <div className="collapsible-content">
                <div className="scheduleCard">
                  <div className="scheduleHead">
                    <h3>Amortization Schedule</h3>
                    <button className="secondaryBtn" onClick={downloadPDF}>
                      Download as PDF
                    </button>
                  </div>

                  <div className="tableScroll">
                    <table className="scheduleTable">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Interest</th>
                          <th>Principal</th>
                          <th>Remaining Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedule.map((row) => (
                          <tr key={row.paymentNumber}>
                            <td>{row.paymentNumber}</td>
                            <td>${row.interestPaid}</td>
                            <td>${row.principalPaid}</td>
                            <td>${row.remainingBalance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div ref={chartRef} className="chartCard">
                  <AmortizationChart schedule={schedule} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
