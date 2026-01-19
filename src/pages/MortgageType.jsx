import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

const MORTGAGES = {
  "fixed-rate": {
    title: "Fixed-Rate Mortgage",
    heading: "GET THE BEST MORTGAGE PRODUCTS WITH THE LOWEST FIXED RATE MORTGAGE !",
    description:
      `We compare fixed-rate mortgage options across our network of banks and lenders to make sure you get the best deal available.

Our team is committed to supporting you throughout the process and is always here to answer your questions.

Since buying or refinancing can be time-sensitive, we act fast and stay on top of every detail to keep things moving smoothly.

With strong knowledge of the mortgage market and products, we customize a solution that fits your specific situation and goals.

We also keep you updated at every step, so you always know what’s happening and feel confident from start to finish.`,
  },
  "variable-rate": {
    title: "Variable-Rate Mortgage",
    heading: "Get the lowest variable rate mortgage from banks and lenders across the country.",
    description:
      `We compare variable-rate mortgage options across our network of banks and lenders to ensure you get the best rate and terms available.

Our team works continuously on your behalf and is always here to answer your questions or address any concerns.

Because purchasing or refinancing can be time-sensitive, we move quickly and efficiently to keep everything on track while securing the right variable-rate mortgage.

With deep knowledge of the mortgage market and products, we tailor a solution that fits your unique situation and goals.

We also keep you updated at every step, so you feel informed, comfortable, and confident throughout the entire mortgage process.`,
  },
  "adjustable-rate": {
    title: "Adjustable-Rate Mortgage (ARM)",
     heading: "Payments That Move With Rates.",
    description:
      `An adjustable-rate mortgage (ARM) is similar to a variable-rate mortgage because the interest rate can change over time as the lender’s prime rate moves. The key difference is that with an ARM, your payment amount usually changes when the rate changes, so your monthly (or bi-weekly) payment can increase or decrease.

This option can be a good fit if you’re comfortable with some payment fluctuation and want to take advantage of potential rate drops. It’s also helpful for people who want a clear picture of how rate changes affect their cash flow, because the payment adjusts right away rather than staying the same.

Before choosing an ARM, it’s important to plan for “what-if” scenarios—so you know how your budget would handle higher payments if rates rise, and how much flexibility you’d have during the term.`,
  },
  closed: {
    title: "Closed Mortgage",
    heading:"Lower Rates, Less Flexibility.",
    description:
      `A closed mortgage usually comes with a lower interest rate because you’re committing to keep the mortgage for a specific term (for example, 2–5 years). The trade-off is less flexibility: if you want to break the mortgage early—because you sell your home, refinance, or switch lenders—you may face prepayment restrictions and a penalty.

Most closed mortgages still allow some prepayment privileges, such as paying an extra percentage each year (lump-sum payments) and increasing your regular payments, but there are limits. If you go beyond those limits or end the term early, the lender can charge a penalty (often based on either a few months’ interest or the interest rate differential, depending on the mortgage type and term).

A closed mortgage is a common choice when you expect to stay in the home and keep the mortgage in place for the full term, and you want the benefit of a lower rate. If there’s a chance you’ll move or refinance soon, it’s worth reviewing the penalty details carefully before choosing this option.`,
  },
  open: {
    title: "Open Mortgage",
    heading: "Maximum flexibility when your plans may change.",
    description:
      `An open mortgage typically comes with a higher interest rate because it gives you maximum flexibility. The biggest advantage is that you can pay off the mortgage—partially or in full—at any time without facing prepayment penalties. That means if your plans change, you’re not “locked in” for the term the way you would be with a closed mortgage.

This option can be useful when you expect a major change soon, such as selling your home, refinancing, moving, or receiving a lump sum (for example, a bonus, inheritance, or proceeds from another property). Instead of worrying about breaking the mortgage and paying a penalty, you can exit cleanly when the timing is right.

Because open mortgages usually cost more month-to-month, they’re often used as a short-term solution. If you don’t plan to make changes for a while, a closed mortgage may be more cost-effective—so it’s important to weigh the flexibility against the higher rate.`,
  },
  "high-ratio": {
    title: "High-Ratio Mortgage",
    heading: "A smart path to homeownership with less than 20% down",
    description:
      `A high-ratio mortgage is used when your down payment is less than 20% of the purchase price. Because the lender is taking on more risk, this type of mortgage requires mortgage default insurance through CMHC, Sagen, or Canada Guaranty. The insurance protects the lender (not the borrower), and the premium is typically added to your mortgage balance and paid off over time.

High-ratio mortgages are very common for first-time home buyers because they allow you to buy a home sooner with a smaller down payment. In many cases, insured mortgages can also qualify for competitive interest rates because the lender’s risk is reduced.

Keep in mind that you’ll need to meet certain qualifying rules and minimum down payment requirements (for example, 5% on the first portion of the purchase price). A mortgage professional can help you understand the total cost, monthly payments, and the best lender options for your situation.`,
  },
  conventional: {
    title: "Conventional Mortgage",
    heading:"Skip Mortgage Insurance with a Conventional Mortgage",
    description:
      `A conventional mortgage means you’re putting 20% or more down on the purchase price, which means mortgage default insurance isn’t required. Because there’s no insurance premium added to your mortgage, your total borrowing cost may be lower compared to an insured (high-ratio) mortgage—especially on larger purchase prices.

Conventional mortgages often come with more flexibility. For example, you may have a wider choice of lenders, terms, and features such as prepayment privileges, refinancing options, and different amortization lengths (depending on qualification and lender rules). It can also be easier to access equity later through refinancing or a HELOC, since you start with more equity in the property.

That said, rates can vary—sometimes insured mortgages offer slightly lower rates because the lender’s risk is reduced by insurance. The best option depends on your goals, timeline, and overall financial picture, so comparing both paths can be worthwhile.`,
  },
  insured: {
    title: "Insured Mortgage",
    heading: "Protecting Lenders with an Insured Mortgage",
    description:
      "An insured mortgage is backed by CMHC or a private insurer, which reduces the lender’s risk. Because of that, insured mortgages often qualify for lower interest rates.",
  },
  uninsured: {
    title: "Uninsured Mortgage",
    heading: "No Mortgage Insurance with an Uninsured Mortgage",
    description:
     `An insured mortgage is backed by mortgage default insurance through CMHC, Sagen, or Canada Guaranty, which protects the lender if the borrower can’t make payments. Because the lender’s risk is lower, insured mortgages often come with more competitive interest rates than uninsured options.

This type of mortgage is most common when your down payment is less than 20% (high-ratio), since insurance is required. The insurance premium is paid by the borrower (even though it protects the lender) and is usually added to the mortgage balance and paid off over the life of the mortgage.

Insured mortgages also follow specific guidelines—such as maximum purchase price rules, qualifying requirements, and property criteria. Even with the premium, the lower rate can make an insured mortgage a strong option for many buyers, especially when budgeting and cash flow are priorities.`,
  },
  private: {
    title: "Private Mortgage",
    heading: "When traditional financing isn’t an option.",
    description:
      "A private mortgage comes from a private lender rather than a bank. Rates are usually higher, but it can be helpful when traditional qualification isn’t possible or timing is urgent.",
  },
  reverse: {
    title: "Reverse Mortgage",
    heading: "Unlock Your Home's Equity with a Reverse Mortgage",
    description:
      "A reverse mortgage is for homeowners 55+ and allows you to borrow against home equity without making monthly mortgage payments. The balance is typically repaid when the home is sold.",
  },
  "second-heloc": {
    title: "Second Mortgage / HELOC",
    heading: "Access Additional Funds with a Second Mortgage or HELOC",
    description:
      "A second mortgage or HELOC lets you borrow against your home equity on top of an existing mortgage. Since it’s behind the first mortgage, interest rates are usually higher.",
  },
};

export default function MortgageType() {
  const { type } = useParams();

  const data = useMemo(() => {
    return (
      MORTGAGES[type] || {
        title: "Mortgage Type",
        description:
          "This mortgage type page was not found. Please go back and choose another mortgage type.",
      }
    );
  }, [type]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-text">
        {data.title}
      </h1>

      <div className="mt-6 rounded-2xl border border-border bg-white p-6">
        <h2 className="text-lg font-bold text-text">{data.heading}</h2>
        <p className="mt-3 text-muted leading-relaxed">{data.description}</p>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-brand-tint p-6">
        <h3 className="text-base font-bold text-text">
          Want the best option for your situation?
        </h3>
        <p className="mt-2 text-sm text-muted">
          Get a quick recommendation based on your goals, down payment, and timeline.
        </p>
        <a
          href="/contact"
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover"
        >
          Lets Get Started
        </a>
      </div>
    </div>
  );
}
