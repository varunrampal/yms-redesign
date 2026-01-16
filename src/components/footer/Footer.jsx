import React from "react";
import Container from "../layout/Container.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white pb-16 md:pb-0">
      <Container className="py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-base font-extrabold tracking-tight text-text">The Mortgages</div>
            <div className="mt-2 text-sm text-muted">Mortgage solutions with clarity, speed, and support.</div>
          </div>

          <div className="text-sm">
            <div className="font-semibold text-text">Links</div>
            <div className="mt-2 grid gap-1 text-muted">
              <a href="/affordability" className="hover:text-text">Affordability</a>
              <a href="/services" className="hover:text-text">Services</a>
              <a href="/calculators" className="hover:text-text">Calculators</a>
              <a href="/mortgages" className="hover:text-text">Mortgages</a>
              <a href="/faq" className="hover:text-text">FAQ</a>
              <a href="/contact" className="hover:text-text">Contact</a>
            </div>
          </div>

          <div className="text-sm">
            <div className="font-semibold text-text">Compliance</div>
            <div className="mt-2 text-muted">
              Add your brokerage name, license #, and service area.
              <div className="mt-1 text-xs text-muted/80">
                This site is for informational purposes and does not constitute financial advice.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} The Mortgages. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-text">Privacy</a>
            <a href="#" className="hover:text-text">Terms</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
