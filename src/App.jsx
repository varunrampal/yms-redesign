import React from "react";
import { Routes, Route } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout.jsx";
import Affordability from "./pages/Affordability";
import Services from "./pages/home/Services.jsx";

import Home from "./pages/Home";
import MortgageType from "./pages/MortgageType";
import FAQ from "./pages/home/FAQ.jsx";
import ContactCTA from "./pages/home/ContactCTA.jsx";
import Mortgages from "./pages/Mortgages.jsx";
import MotgageQualifierCalculator from "./pages/MortgageQualifierCalculator.jsx";
import MortgagePaymentCalculator from "./pages/MortgagePaymentCalculator.jsx";
import MortgageApplication from "./pages/MortgageApplication.jsx";
import ServiceDetails from "./pages/services/ServiceDetails.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/affordability" element={<Affordability />} />
        <Route path="/services" element={<Services/>} />
         <Route path="/faq" element={<FAQ/>} />
         <Route path="/contact" element={<ContactCTA/>} />
         <Route path="/mortgages" element={<Mortgages />} />
        <Route path="/mortgages/:type" element={<MortgageType />} />
         <Route path="/mortgageaffordability" element={<MotgageQualifierCalculator />} />
         <Route path="/mortgagepaymentcalculator" element={<MortgagePaymentCalculator />} />
            <Route path="/mortgageapplication" element={<MortgageApplication />} />
            <Route path="/services/:slug" element={<ServiceDetails />} />
      </Route>
    </Routes>
  );
}
