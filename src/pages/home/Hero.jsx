import React from "react";
import Container from "../../components/layout/Container.jsx";
import Glow from "../../components/effects/Glow.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import StatPill from "../../components/ui/StatPill.jsx";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-tint to-white" />
      <Glow />

      <Container className="relative py-12 sm:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>Licensed & insured</Badge>
              <Badge>Fast pre-approvals</Badge>
              <Badge>Purchase • Refinance • Renewal</Badge>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-text sm:text-5xl">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--color-brand) 0%, color-mix(in oklab, var(--color-brand) 55%, black) 55%, color-mix(in oklab, var(--color-brand) 60%, cyan) 100%)",
                }}
              >
                Smarter mortgages
              </span>
              , built around your goals.
            </h1>

            <p className="mt-4 text-base text-muted sm:text-lg">
              We compare lenders, build a clear strategy, and guide you through every document and condition—so you close with confidence.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href="#apply" icon="✅">Get Pre-Approved</Button>
             <Button variant="outline" href="tel:6042172992" icon="📞">Call</Button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <StatPill label="Response time" value="1 business day" />
              <StatPill label="Lender access" value="Banks + alt" />
              <StatPill label="Support" value="Until closing" />
            </div>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-muted">
              <span>✅ Clear guidance</span>
              <span>✅ Multiple lender options</span>
              <span>✅ Closing support</span>
            </div>
          </div>

          <Card className="relative overflow-hidden p-6">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(900px 240px at 20% 0%, rgb(from var(--color-brand) r g b / 0.16) 0%, rgb(from var(--color-brand) r g b / 0) 60%)",
              }}
            />

            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* <div
                  className="relative h-14 w-14 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-brand) 0%, color-mix(in oklab, var(--color-brand) 55%, white) 70%, var(--color-brand-hover) 100%)",
                  }}
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-white/35" />
                </div> */}
                <div>
                  <div className="text-lg font-extrabold tracking-tight text-text">Gaurav Sharma</div>
                  <div className="text-sm text-muted">Mortgage Advisor</div>
                </div>
              </div>

              <span className="hidden rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-text ring-1 ring-border sm:inline-flex">
                Trusted guidance
              </span>
            </div>

            <div className="relative mt-6 grid gap-3 text-sm">
              <div className="rounded-3xl border border-border bg-white/70 p-4 shadow-lg">
                <div className="font-semibold text-text">What you’ll get</div>
                <ul className="mt-2 grid gap-1 text-muted">
                  <li>• Simple, stress-free mortgages</li>
                  <li>• 10+ years experience</li>
                  <li>• Clear, honest advice</li>
                  <li>• Tailored mortgage solutions</li>
                  <li>• Confidence at every step</li>
                  <li>• Long-term client focus</li>
                  <li>• First-time buyers to refinances</li>
                  <li>• Investing & debt consolidation</li>
                  <li>• Home equity access</li>
                  <li>• Best option for your future plans</li>
                </ul>
      
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-white/80 p-4 shadow-lg">
                  <div className="font-semibold text-text">Email</div>
                  <div className="mt-1 text-muted">info@themortgages.net</div>
                </div>
                <div className="rounded-3xl border border-border bg-white/80 p-4 shadow-lg">
                  <div className="font-semibold text-text">Phone</div>
                  <div className="mt-1 text-muted">(604) 217-2992</div>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-white/80 p-4 shadow-lg">
                <div className="font-semibold text-text">Next step</div>
                <div className="mt-1 text-muted">Use the Let’s Connect below—we’ll reply with best-fit options.</div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
