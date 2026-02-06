import React from "react";
import MortgageQualifier from "../components/calculators/MortgageQualifier";
import MortgageAffordabilityCalculator from "../components/calculators/MortgageAffordabilityCalculator";

export default function Affordability() {
  return (
    <>
     <div className="mx-auto max-w-5xl px-4 py-10">
     <MortgageAffordabilityCalculator/>
    {/* <MortgageQualifier /> */}
    </div>
    </>
  );
}
