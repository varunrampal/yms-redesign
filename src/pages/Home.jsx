import React from "react";
import Navbar from "../components/nav/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import StickyMobileCTA from "../components/footer/StickyMobileCTA.jsx";

import Hero from "./home/Hero.jsx";
import QuoteStrip from "./home/QuoteStrip.jsx";
import FeatureSplitSection from"./home/FeatureSplitSection.jsx"
import Services from "./home/Services.jsx";
import Steps from "./home/Steps.jsx";
import Reviews from "./home/Reviews.jsx";
import Calculators from "./home/Calculators.jsx";
import FAQ from "./home/FAQ.jsx";
import ContactCTA from "./home/ContactCTA.jsx";
import GuaranteeSection from "./home/GuaranteeSection.jsx"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-text">
      {/* <Navbar /> */}
      <main className="relative">
        <Hero />
        <FeatureSplitSection/>
        <GuaranteeSection/>
         <Calculators />
        {/* <QuoteStrip /> */}
        {/* <Services /> */}
        {/* <Steps /> */}
       
        <Reviews />
        
        {/* <FAQ /> */}
        {/* <ContactCTA /> */}
      </main>
      {/* <Footer /> */}
      <StickyMobileCTA />
    </div>
  );
}
