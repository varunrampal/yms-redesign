import React from "react";
import Navbar from "../components/nav/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import StickyMobileCTA from "../components/footer/StickyMobileCTA.jsx";

import Hero from "./home/Hero.jsx";
import QuoteStrip from "./home/QuoteStrip.jsx";
import Services from "./home/Services.jsx";
import Steps from "./home/Steps.jsx";
import Reviews from "./home/Reviews.jsx";
import Calculators from "./home/Calculators.jsx";
import FAQ from "./home/FAQ.jsx";
import ContactCTA from "./home/ContactCTA.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-text">
      {/* <Navbar /> */}
      <main className="relative">
        <Hero />
        <QuoteStrip />
        <Services />
        <Steps />
        <Calculators />
        <Reviews />
        
        <FAQ />
        <ContactCTA />
      </main>
      {/* <Footer /> */}
      <StickyMobileCTA />
    </div>
  );
}
