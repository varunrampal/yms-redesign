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
    a: "In many cases, the lender pays the broker. Some private or alternative deals may involve fees—these are explained upfront.",
    tag: "Fees",
  },
  {
    q: "What’s the difference between a mortgage broker and a bank?",
    a: "A broker can compare options from multiple lenders, while a bank offers only its own products. The best choice depends on your needs and timeline.",
    tag: "Basics",
  },
  {
    q: "Fixed vs variable—what’s better in Canada?",
    a: "It depends on your goals and risk comfort. Fixed is predictable, variable can change with prime; we can compare scenarios side-by-side.",
    tag: "Rates",
  },
  {
    q: "What is the mortgage stress test?",
    a: "Most borrowers must qualify at the higher of the contract rate + 2% or a minimum qualifying rate set by the regulator.",
    tag: "Qualifying",
  },
  {
    q: "How much down payment do I need in Canada?",
    a: "Minimum down payment depends on purchase price. Many buyers put 5% down on the first portion and more as the price increases.",
    tag: "Down Payment",
  },
  {
    q: "What is a high-ratio mortgage?",
    a: "A mortgage with less than 20% down. It requires mortgage default insurance through CMHC, Sagen, or Canada Guaranty.",
    tag: "Insurance",
  },
  {
    q: "What is mortgage default insurance (CMHC insurance)?",
    a: "It protects the lender if you default. The premium is usually paid by the borrower and often added to the mortgage amount.",
    tag: "Insurance",
  },
  {
    q: "Can I avoid CMHC insurance?",
    a: "Yes—by putting 20% or more down (a conventional mortgage) or by using certain non-insured lender options depending on your situation.",
    tag: "Insurance",
  },
  {
    q: "What credit score do I need for a mortgage in Canada?",
    a: "Requirements vary by lender and product. A stronger score usually improves approval odds and pricing, but alternatives may exist.",
    tag: "Credit",
  },
  {
    q: "Can I get a mortgage with bad credit?",
    a: "Possibly. Alternative or private lenders may help depending on income, equity, and overall risk—often at higher rates and fees.",
    tag: "Alternative",
  },
  {
    q: "What counts as household income for qualification?",
    a: "Typically employment income, self-employment income, bonuses (sometimes), child tax benefits (sometimes), and rental income (partially), depending on the lender.",
    tag: "Income",
  },
  {
    q: "How is rental income treated when qualifying?",
    a: "Many lenders use a percentage of gross rent or apply a net rental calculation. Rules vary by lender and property type.",
    tag: "Rental",
  },
  {
    q: "What is GDS and TDS?",
    a: "GDS is housing costs compared to income; TDS includes housing plus other debts. Lenders use these to assess affordability.",
    tag: "Qualifying",
  },
  {
    q: "Do condo fees affect mortgage qualification?",
    a: "Yes. Lenders include condo fees in your housing costs when calculating affordability ratios.",
    tag: "Qualifying",
  },
  {
    q: "Do property taxes affect mortgage qualification?",
    a: "Yes. Property taxes are part of your monthly housing cost used in qualification ratios.",
    tag: "Qualifying",
  },
  {
    q: "Do heating costs affect mortgage qualification?",
    a: "Often yes. Many lenders include a standard amount (or actual) for heating when qualifying you.",
    tag: "Qualifying",
  },
  {
    q: "What’s the difference between pre-qualification and pre-approval?",
    a: "Pre-qualification is an estimate; pre-approval is more detailed and may include a rate hold, subject to conditions.",
    tag: "Pre-Approval",
  },
  {
    q: "How long is a pre-approval valid in Canada?",
    a: "Many lenders offer rate holds for a limited period. The timeline varies, and conditions still apply.",
    tag: "Pre-Approval",
  },
  {
    q: "Does pre-approval guarantee approval?",
    a: "No. Final approval depends on full document review, property appraisal, and meeting lender conditions.",
    tag: "Pre-Approval",
  },
  {
    q: "What documents do I need for a mortgage application?",
    a: "Typically ID, income documents, down payment proof, bank statements, and property details. Self-employed applicants usually need more documentation.",
    tag: "Documents",
  },
  {
    q: "What is proof of down payment?",
    a: "Usually bank statements, investment statements, gift letter (if gifted), or sale documents if funds came from selling assets.",
    tag: "Down Payment",
  },
  {
    q: "Can my down payment be a gift?",
    a: "Often yes, especially from immediate family. Many lenders require a signed gift letter and proof of the funds transfer.",
    tag: "Down Payment",
  },
  {
    q: "Can I borrow my down payment?",
    a: "Sometimes, but it can reduce how much you qualify for and may not be allowed for certain insured mortgages.",
    tag: "Down Payment",
  },
  {
    q: "What are closing costs in Canada?",
    a: "Common costs include legal fees, land transfer taxes (or property transfer tax), appraisal, title insurance, and adjustments. Budgeting ahead helps.",
    tag: "Closing Costs",
  },
  {
    q: "How much should I budget for closing costs?",
    a: "A common estimate is 1.5%–3% of the purchase price, but it varies by province, property, and situation.",
    tag: "Closing Costs",
  },
  {
    q: "What is land transfer tax / property transfer tax?",
    a: "A provincial tax paid on closing in many provinces (name and amount vary by province). Some first-time buyers may qualify for rebates.",
    tag: "Closing Costs",
  },
  {
    q: "What is a mortgage term?",
    a: "The term is the length of time your rate and conditions are set (e.g., 3 or 5 years).",
    tag: "Basics",
  },
  {
    q: "What is amortization?",
    a: "Amortization is the total time it takes to pay off the mortgage (commonly 25 or 30 years, depending on down payment and lender rules).",
    tag: "Basics",
  },
  {
    q: "Can I get a 30-year amortization in Canada?",
    a: "Often only with 20%+ down and certain lenders. Insured mortgages typically have stricter limits.",
    tag: "Amortization",
  },
  {
    q: "What is the difference between insured and uninsured mortgages?",
    a: "Insured mortgages have default insurance backing; uninsured do not (often 20%+ down). Pricing and rules can differ.",
    tag: "Insurance",
  },
  {
    q: "Are insured mortgage rates always lower?",
    a: "Often they can be, because lender risk is reduced. But total cost must include insurance premium and your overall situation.",
    tag: "Rates",
  },
  {
    q: "What is an interest rate hold?",
    a: "A lender may hold a rate for a limited time during pre-approval, protecting you if rates rise before closing.",
    tag: "Rates",
  },
  {
    q: "Can I switch lenders at renewal?",
    a: "Yes. Many borrowers shop at renewal to improve rate or terms. Timing and paperwork matter, so start early.",
    tag: "Renewal",
  },
  {
    q: "What is a mortgage renewal?",
    a: "When your term ends, you choose a new term and rate (with your lender or a new lender).",
    tag: "Renewal",
  },
  {
    q: "When should I start shopping for renewal?",
    a: "Many people start 3–6 months before the renewal date to compare options and lock in a competitive deal.",
    tag: "Renewal",
  },
  {
    q: "What is refinancing?",
    a: "Refinancing replaces your current mortgage with a new one, often to access equity, lower payments, consolidate debt, or change terms.",
    tag: "Refinance",
  },
  {
    q: "What is an equity take-out refinance?",
    a: "It’s refinancing to borrow against your home equity and take cash out for goals like renovations, investments, or debt consolidation.",
    tag: "Refinance",
  },
  {
    q: "Can I refinance with less than 20% equity?",
    a: "It depends on lender rules, property value, and mortgage type. Some refinance options require a minimum equity position.",
    tag: "Refinance",
  },
  {
    q: "What is a HELOC?",
    a: "A Home Equity Line of Credit lets you borrow against home equity as needed. Interest is usually variable, and payment rules vary.",
    tag: "HELOC",
  },
  {
    q: "Second mortgage vs HELOC—what’s the difference?",
    a: "A second mortgage is a lump sum with fixed payments, while a HELOC is revolving credit. Rates and flexibility differ.",
    tag: "HELOC",
  },
  {
    q: "Can I consolidate debt into my mortgage?",
    a: "Often yes, through refinancing. This can reduce monthly payments, but it may increase total interest over time depending on structure.",
    tag: "Debt",
  },
  {
    q: "What is a mortgage penalty?",
    a: "A penalty may apply if you break a closed mortgage early. It varies by lender, rate type, and contract terms.",
    tag: "Penalties",
  },
  {
    q: "How are fixed-rate mortgage penalties calculated?",
    a: "Often based on a few months’ interest or an interest rate differential (IRD). The method varies by lender.",
    tag: "Penalties",
  },
  {
    q: "How are variable-rate mortgage penalties calculated?",
    a: "Often based on a set number of months’ interest, but exact rules differ by lender.",
    tag: "Penalties",
  },
  {
    q: "What are prepayment privileges?",
    a: "Many mortgages allow extra lump-sum payments and/or payment increases each year without penalty, up to set limits.",
    tag: "Prepayment",
  },
  {
    q: "Can I make lump-sum payments on my mortgage?",
    a: "Often yes, within your prepayment privileges. Check your mortgage terms for limits and timing.",
    tag: "Prepayment",
  },
  {
    q: "Can I increase my regular payments?",
    a: "Many mortgages allow payment increases within limits. This can help pay off the mortgage faster and reduce interest.",
    tag: "Prepayment",
  },
  {
    q: "What is a closed mortgage?",
    a: "A closed mortgage usually has a lower rate but limits early payoff or charges penalties if you break the term.",
    tag: "Basics",
  },
  {
    q: "What is an open mortgage?",
    a: "An open mortgage allows payoff anytime without penalty but typically has a higher rate and is often used short-term.",
    tag: "Basics",
  },
  {
    q: "What is portability?",
    a: "Portability lets you move your mortgage to a new property, subject to lender rules. It can help avoid penalties when moving.",
    tag: "Moving",
  },
  {
    q: "What is blending and extending?",
    a: "Some lenders allow you to blend your current rate with a new rate and extend the term, sometimes avoiding a full penalty.",
    tag: "Rates",
  },
  {
    q: "What is an appraisal and when is it needed?",
    a: "An appraisal estimates property value and may be required for purchases, refinances, or switches depending on lender policy.",
    tag: "Property",
  },
  {
    q: "Who pays for the appraisal?",
    a: "Often the borrower pays, though some lenders cover it as a promotion. It depends on the lender and the deal.",
    tag: "Closing Costs",
  },
  {
    q: "What is title insurance?",
    a: "Title insurance helps protect against issues with property title, fraud, and certain defects. It’s often included in closing costs.",
    tag: "Closing Costs",
  },
  {
    q: "What is a mortgage commitment letter?",
    a: "A commitment letter outlines the lender’s approval, rate, conditions, and requirements that must be met before funding.",
    tag: "Process",
  },
  {
    q: "What conditions are common on mortgage approvals?",
    a: "Common conditions include income verification, down payment proof, appraisal, property insurance, and satisfaction of credit review.",
    tag: "Process",
  },
  {
    q: "What is mortgage default insurance premium?",
    a: "It’s the cost of insuring a high-ratio mortgage. The premium depends on down payment size and may be added to the mortgage.",
    tag: "Insurance",
  },
  {
    q: "Can I pay the insurance premium upfront?",
    a: "Sometimes, but many borrowers roll it into the mortgage. Options depend on lender and insurer rules.",
    tag: "Insurance",
  },
  {
    q: "What is a rate buy-down?",
    a: "Some lenders offer pricing options where fees or points may reduce the interest rate. Availability varies.",
    tag: "Rates",
  },
  {
    q: "How do mortgage brokers get paid?",
    a: "Typically through lender commissions on funded deals. In some cases, borrowers pay fees, especially for private/alternative mortgages.",
    tag: "Fees",
  },
  {
    q: "Can I lock a rate while I shop for a home?",
    a: "Often yes with a pre-approval rate hold. The exact period and conditions vary by lender.",
    tag: "Pre-Approval",
  },
  {
    q: "Does changing jobs affect mortgage approval?",
    a: "It can. Lenders may reassess income stability. Switching industries or moving to probation may require extra documentation.",
    tag: "Income",
  },
  {
    q: "How does probation period affect qualification?",
    a: "Some lenders want you past probation, but exceptions exist depending on industry, history, and income strength.",
    tag: "Income",
  },
  {
    q: "Can self-employed borrowers qualify in Canada?",
    a: "Yes. Lenders often require two years of financials, Notices of Assessment, and business documents. Alternative programs may exist.",
    tag: "Self-Employed",
  },
  {
    q: "How is self-employed income calculated?",
    a: "Many lenders use an average of reported income over time and may add back certain expenses. Rules vary.",
    tag: "Self-Employed",
  },
  {
    q: "Do I need a down payment for pre-approval?",
    a: "You don’t need it in hand for an initial conversation, but you typically need proof of funds before final approval and closing.",
    tag: "Pre-Approval",
  },
  {
    q: "Can I buy a home with 5% down in Canada?",
    a: "Many first-time buyers can, depending on purchase price and lender/insurer rules, with mortgage default insurance required.",
    tag: "Down Payment",
  },
  {
    q: "Can I use RRSP funds for a down payment?",
    a: "Often yes through the Home Buyers’ Plan (if eligible). Rules and repayment requirements apply.",
    tag: "Down Payment",
  },
  {
    q: "What is the Home Buyers’ Plan (HBP)?",
    a: "It allows eligible buyers to withdraw funds from their RRSP for a down payment, with repayment required over time.",
    tag: "Down Payment",
  },
  {
    q: "What is a co-signer and when is it used?",
    a: "A co-signer supports qualification with their income/credit. They’re often used when the primary borrower needs help qualifying.",
    tag: "Qualifying",
  },
  {
    q: "What is a guarantor vs co-signer?",
    a: "Both support the application, but structures differ by lender. The lender will explain responsibilities and documentation.",
    tag: "Qualifying",
  },
  {
    q: "Can newcomers to Canada get a mortgage?",
    a: "Often yes through newcomer programs. Requirements vary based on status, down payment, income, and credit history.",
    tag: "Newcomers",
  },
  {
    q: "Can I get a mortgage without Canadian credit history?",
    a: "Possibly. Some lenders use alternative credit and strong down payment. Newcomer programs can help.",
    tag: "Newcomers",
  },
  {
    q: "What is a mortgage switch?",
    a: "Switching transfers your mortgage to a new lender without increasing the amount borrowed (often at renewal).",
    tag: "Renewal",
  },
  {
    q: "Is there a penalty to switch lenders at renewal?",
    a: "Usually not if you switch at the end of term. Breaking mid-term may trigger penalties.",
    tag: "Renewal",
  },
  {
    q: "What’s the difference between a refinance and a switch?",
    a: "A switch keeps the balance the same; a refinance changes the balance or amortization (often to access equity).",
    tag: "Refinance",
  },
  {
    q: "Can I refinance to a longer amortization to lower payments?",
    a: "Sometimes, depending on lender rules and equity. A longer amortization can lower payments but may increase total interest.",
    tag: "Refinance",
  },
  {
    q: "What is a mortgage trigger rate (variable)?",
    a: "It’s a rate level where your payments may no longer cover interest, requiring payment changes or other adjustments depending on the lender.",
    tag: "Rates",
  },
  {
    q: "What is a trigger point (variable mortgage)?",
    a: "It’s when your mortgage balance reaches a certain threshold due to rate increases, prompting lender action such as payment increases.",
    tag: "Rates",
  },
  {
    q: "What is a mortgage payment frequency?",
    a: "It’s how often you make payments—monthly, semi-monthly, bi-weekly, or weekly. Some frequencies can reduce interest over time.",
    tag: "Payments",
  },
  {
    q: "Bi-weekly vs accelerated bi-weekly—what’s the difference?",
    a: "Accelerated bi-weekly increases total annual payments, which can pay the mortgage off faster compared to standard bi-weekly.",
    tag: "Payments",
  },
  {
    q: "Can I change my payment frequency later?",
    a: "Often yes, depending on the lender and mortgage type. Changes may require approval or conditions.",
    tag: "Payments",
  },
  {
    q: "What is an accelerated payment?",
    a: "An accelerated payment schedule increases how much you pay annually, reducing amortization and total interest.",
    tag: "Payments",
  },
  {
    q: "What is a mortgage default?",
    a: "Default is when mortgage payments aren’t made as agreed. Lenders have processes that may lead to legal actions if unresolved.",
    tag: "Basics",
  },
  {
    q: "What is a bridge loan?",
    a: "Bridge financing helps cover the gap when you’re buying a new home before your current one sells. Terms depend on timing and equity.",
    tag: "Moving",
  },
  {
    q: "What is a mortgage assumption?",
    a: "Assuming a mortgage means taking over the seller’s mortgage terms, if the lender allows it. It can be useful in certain rate environments.",
    tag: "Buying",
  },
  {
    q: "Can I assume someone else’s mortgage in Canada?",
    a: "Sometimes, if the mortgage is assumable and the lender approves the buyer’s qualification. Not all mortgages allow this.",
    tag: "Buying",
  },
  {
    q: "What is a collateral mortgage?",
    a: "A collateral mortgage registers for more than the mortgage amount, which can offer flexibility but may affect switching lenders later.",
    tag: "Basics",
  },
  {
    q: "What is a standard charge mortgage?",
    a: "A standard charge is registered for the mortgage amount and can be simpler to switch at renewal, depending on lender rules.",
    tag: "Basics",
  },
  {
    q: "How does the lender decide the interest rate I get?",
    a: "Rates depend on mortgage type, term, down payment, credit, income, property, and whether the mortgage is insured or uninsured.",
    tag: "Rates",
  },
  {
    q: "Does a bigger down payment help my mortgage rate?",
    a: "It can improve your overall profile and flexibility, but insured mortgages sometimes have very competitive rates due to lower lender risk.",
    tag: "Rates",
  },
  {
    q: "What is a rate hold and how does it work?",
    a: "A rate hold protects your rate for a set period while you shop. If rates drop, some lenders may allow a lower rate before closing.",
    tag: "Rates",
  },
  {
    q: "Can I negotiate my mortgage rate?",
    a: "Often yes. Brokers and lenders may have discretion depending on the product and your profile.",
    tag: "Rates",
  },
  {
    q: "Is it better to choose a 5-year term in Canada?",
    a: "It depends. Five-year terms are common, but shorter or longer terms may better match your plans and risk tolerance.",
    tag: "Terms",
  },
  {
    q: "What term length should I pick—2, 3, or 5 years?",
    a: "Choose based on your timeline, expected life changes, and rate outlook comfort. We can compare total cost scenarios.",
    tag: "Terms",
  },
  {
    q: "What is a mortgage rate “discount”?",
    a: "It’s the difference between the lender’s posted rate and the offered rate. Discounts vary by lender, product, and market conditions.",
    tag: "Rates",
  },
  {
    q: "What is the posted rate vs contract rate?",
    a: "Posted rates are lender-advertised rates; contract rates are what you actually receive. Penalty calculations may reference posted rates at some lenders.",
    tag: "Penalties",
  },
  {
    q: "What is an “A-lender” vs “B-lender” in Canada?",
    a: "A-lenders are traditional banks and prime lenders; B-lenders are alternative lenders with more flexible qualification at higher pricing.",
    tag: "Lenders",
  },
  {
    q: "What is a private lender mortgage?",
    a: "A mortgage funded by individuals or private firms. It’s often short-term and used when other financing isn’t possible.",
    tag: "Alternative",
  },
  {
    q: "Are private mortgages safe?",
    a: "They can be, when structured properly with clear terms and legal advice. Costs are typically higher, so it’s usually a short-term strategy.",
    tag: "Alternative",
  },
  {
    q: "Can I renew into a different mortgage type?",
    a: "Often yes. Renewal can be a good time to switch from variable to fixed (or vice versa) depending on your goals and rates.",
    tag: "Renewal",
  },
  {
    q: "What happens if interest rates rise on a variable mortgage?",
    a: "Your interest cost rises. Depending on your product, your payment may change or the interest portion of your payment may increase.",
    tag: "Rates",
  },
  {
    q: "What happens if interest rates drop on a variable mortgage?",
    a: "Your interest cost may fall. Depending on the product, your payment could drop or more of your payment could go to principal.",
    tag: "Rates",
  },
  {
    q: "What is a mortgage rate “cap”?",
    a: "Some variable products may have caps or limits, but many don’t. Specific features depend on lender and product.",
    tag: "Rates",
  },
  {
    q: "Can I pay my mortgage off early?",
    a: "Often yes, using prepayment privileges or by paying out the mortgage (penalties may apply for closed terms).",
    tag: "Prepayment",
  },
  {
    q: "How do I reduce my mortgage faster?",
    a: "Use accelerated payments, lump sums, increase payment amounts (if allowed), and avoid breaking terms with penalties.",
    tag: "Prepayment",
  },
  {
    q: "What is a mortgage amortization schedule?",
    a: "It shows each payment’s interest and principal portion and the remaining balance over time.",
    tag: "Payments",
  },
  {
    q: "Why do early mortgage payments go mostly to interest?",
    a: "Interest is calculated on the outstanding balance, which is highest at the start. Over time, more of each payment goes to principal.",
    tag: "Payments",
  },
  {
    q: "Can I refinance to renovate my home?",
    a: "Often yes. A refinance can access equity for renovations, sometimes at lower borrowing cost than unsecured loans.",
    tag: "Refinance",
  },
  {
    q: "What is a purchase plus improvements mortgage?",
    a: "Some lenders allow extra funds for renovations included at purchase, released after work is completed, subject to approval.",
    tag: "Buying",
  },
  {
    q: "Does the property type affect mortgage approval?",
    a: "Yes. Condos, rentals, rural properties, and unique homes may have different lender requirements and appraisal considerations.",
    tag: "Property",
  },
  {
    q: "Can I get a mortgage for an investment property?",
    a: "Yes, but qualification rules, down payment, and rate can differ. Rental income may be partially included based on lender policy.",
    tag: "Rental",
  },
  {
    q: "What down payment is needed for a rental property in Canada?",
    a: "Often more than an owner-occupied purchase. Requirements vary by lender and property type.",
    tag: "Rental",
  },
  {
    q: "Can I use projected rent to qualify?",
    a: "Sometimes, especially with appraiser-supported market rent. Policies vary by lender and property type.",
    tag: "Rental",
  },
  {
    q: "What is a mortgage commitment condition of “sale of property”?",
    a: "It means your purchase financing depends on selling your current home. Not all lenders allow this condition.",
    tag: "Buying",
  },
  {
    q: "What is a mortgage “holdback”?",
    a: "A lender may hold back funds until certain conditions are met (e.g., repairs, renovations, or condo docs).",
    tag: "Process",
  },
  {
    q: "What happens if an appraisal comes in low?",
    a: "You may need a bigger down payment, renegotiate the purchase price, or choose a different lender/product.",
    tag: "Property",
  },
  {
    q: "Can I switch from variable to fixed during the term?",
    a: "Some lenders allow it, often with set rules. It can be an option if you want more payment certainty.",
    tag: "Rates",
  },
  {
    q: "What is a mortgage discharge fee?",
    a: "A lender fee charged when your mortgage is paid out and removed from title, often payable at refinance or sale.",
    tag: "Fees",
  },
  {
    q: "What is a mortgage assignment fee?",
    a: "Some lenders charge a fee to transfer or assign a mortgage under certain circumstances. It depends on the product and lender.",
    tag: "Fees",
  },
  {
    q: "Can I get a mortgage if I’m on maternity/parental leave?",
    a: "Possibly. Lenders may consider your return-to-work letter, history, and household income. Policies vary.",
    tag: "Income",
  },
  {
    q: "What if I’m paid hourly or commission-based?",
    a: "Lenders may average income over time and may require longer history. Documentation and stability matter.",
    tag: "Income",
  },
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
