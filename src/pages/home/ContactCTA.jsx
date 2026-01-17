import React from "react";
import Container from "../../components/layout/Container.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";

export default function ContactCTA() {
  const inputCls =
    "h-11 rounded-2xl border border-border bg-white/85 px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10";

  return (
    <section id="contact">
      <Container className="py-12 sm:py-16">
          <h1 className="text-2xl font-extrabold tracking-tight text-text">
            Contact Us
          </h1>

          <p className="mt-3 max-w-2xl text-muted">
            Explore the most common mortgage types and learn which options may fit your goals.
            
          </p>
        <Card className="relative overflow-hidden mt-5">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative p-7 sm:p-10 bg-gradient-to-br from-brand-tint to-white">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(900px 240px at 15% 0%, rgb(from var(--color-brand) r g b / 0.16) 0%, rgb(from var(--color-brand) r g b / 0) 60%)",
                }}
              />

              <h2 className="relative text-2xl font-extrabold tracking-tight text-text">Ready to get approved?</h2>
              <p className="relative mt-2 text-muted">
                Tell us your goal—purchase, refinance, or renewal—and we’ll map your best options.
              </p>

              <div className="relative mt-6 flex flex-wrap gap-3" id="book">
                <Button href="#apply" icon="✅">Get Pre-Approved</Button>
                <Button variant="outline" href="tel:6042172992" icon="📞">Call</Button>
                <Button variant="outline" href="mailto:info@themortgages.net" icon="✉️">Email</Button>
              </div>

              <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-white/75 p-4 shadow-lg">
                  <div className="text-xs font-semibold text-muted">Service area</div>
                  <div className="mt-1 text-sm font-semibold text-text">British Columbia</div>
                </div>
                <div className="rounded-3xl border border-border bg-white/75 p-4 shadow-lg">
                  <div className="text-xs font-semibold text-muted">Typical response</div>
                  <div className="mt-1 text-sm font-semibold text-text">Within 1 business day</div>
                </div>
              </div>
            </div>

            <div className="p-7 sm:p-10">
              <h3 className="text-lg font-extrabold tracking-tight text-text">Send a quick message</h3>
              <p className="mt-1 text-sm text-muted">Let us know your goals and we'll connect you with a mortgage expert.</p>

              <form
                className="mt-5 grid gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thanks! We'll contact you shortly.");
                }}
              >
                <input className={inputCls} placeholder="Full name" required />
                <input className={inputCls} placeholder="Email" type="email" required />
                <input className={inputCls} placeholder="Phone" />
                <textarea
                  className="min-h-[110px] rounded-2xl border border-border bg-white/85 px-3 py-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
                  placeholder="How can we help? (Purchase, refinance, renewal, etc.)"
                />
                <Button type="submit" className="w-full" icon="📨">
                  Submit
                </Button>

                <div className="text-xs text-muted">By submitting, you agree to be contacted about your request.</div>
              </form>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
