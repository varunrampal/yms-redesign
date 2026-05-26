import React, { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import Container from "../../components/layout/Container.jsx";
import Card from "../../components/ui/Card.jsx";

function formatSubmittedAtVancouver(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);

  const get = (t) => parts.find((p) => p.type === t)?.value || "";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}`;
}

const emailOk = (v) => /^\S+@\S+\.\S+$/.test(String(v || "").trim());

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
const initialForm = {
  name: "",
  phone: "",
  email: "",
  topic: "General Question",
  message: "",
};

  // Honeypot
  const [company, setCompany] = useState("");

const [form, setForm] = useState(initialForm);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const canSubmit = useMemo(() => {
    if (company) return false;
    if (!form.name.trim()) return false;
    if (!form.email.trim() || !emailOk(form.email)) return false;
    if (!form.message.trim()) return false;
    return true;
  }, [form, company]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!canSubmit) {
      setError("Please fill the required fields.");
      return;
    }

    try {
      setLoading(true);

      const templateParams = {
        name: form.name,
        phone: form.phone || "-",
        email: form.email,
        topic: form.topic,
        message: form.message,
        submitted_at: formatSubmittedAtVancouver(),
   
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACTUS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      
      setDone(true);
setForm(initialForm);
setCompany("");
setTimeout(() => {
  setDone(false);
  setError("");
}, 3000);

    } catch (err) {
      setError("Could not send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-tint to-white" />
      <Container className="relative py-12 sm:py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold tracking-tight text-text">
            Contact Us
          </h2>
          <p className="mt-2 text-muted">
            Send us a quick message and we’ll get back to you shortly.
          </p>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="p-6 sm:p-8">
              {done ? (
                <div className="text-center">
                  <div className="text-4xl">✅</div>
                  <div className="mt-3 text-xl font-extrabold text-text">
                    Message sent
                  </div>
                  <p className="mt-2 text-muted">
                    Thanks! We’ll respond as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  {/* honeypot */}
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Full name *"
                      value={form.name}
                      onChange={(v) => set("name", v)}
                      placeholder="Your name"
                    />
                    <Field
                      label="Phone (optional)"
                      value={form.phone}
                      onChange={(v) => set("phone", v)}
                      placeholder="604-xxx-xxxx"
                    />
                    <div className="sm:col-span-2">
                      <Field
                        label="Email *"
                        type="email"
                        value={form.email}
                        onChange={(v) => set("email", v)}
                        placeholder="you@email.com"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Select
                        label="Topic"
                        value={form.topic}
                        onChange={(v) => set("topic", v)}
                        options={[
                          "General Question",
                          "Mortgage Pre-Approval",
                          "Purchase",
                          "Refinance",
                          "Renewal",
                          "Investment Property",
                          "Alternative / Private Lending",
                        ]}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-semibold text-text">
                        Message *
                      </label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder="Tell us what you need help with…"
                        className="mt-2 w-full rounded-2xl border border-border bg-white/80 p-3 text-text outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-2xl border border-border bg-white/80 p-4 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!canSubmit || loading}
                    className="w-full rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-hover disabled:opacity-60"
                  >
                    {loading ? "Sending…" : "Send Message"}
                  </button>

                  <p className="text-xs text-muted">
                    By submitting, you agree to be contacted regarding your request.
                  </p>
                </form>
              )}
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6">
                <div className="text-sm font-extrabold text-text">Quick info</div>
                <p className="mt-2 text-sm text-muted">
                  Prefer a call or text? Send your phone number and best time to reach you.
                </p>
                <div className="mt-4 rounded-2xl border border-border bg-white/70 p-4 text-sm text-muted">
                  <div className="font-semibold text-text">Response time</div>
                  <div className="mt-1">Typically within 1 business day.</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-semibold text-text">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-border bg-white/80 px-3 py-3 text-text outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2"
      />
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-sm font-semibold text-text">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-border bg-white/80 px-3 py-3 text-text outline-none transition focus:ring-2 focus:ring-brand focus:ring-offset-2"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}



// import React from "react";
// import Container from "../../components/layout/Container.jsx";
// import Card from "../../components/ui/Card.jsx";
// import Button from "../../components/ui/Button.jsx";

// export default function ContactCTA() {
//   const inputCls =
//     "h-11 rounded-2xl border border-border bg-white/85 px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10";

//   return (
//     <section id="contact">
//       <Container className="py-12 sm:py-16">
//           <h1 className="text-2xl font-extrabold tracking-tight text-text">
//             Contact Us
//           </h1>

//           <p className="mt-3 max-w-2xl text-muted">
//             Explore the most common mortgage types and learn which options may fit your goals.
            
//           </p>
//         <Card className="relative overflow-hidden mt-5">
//           <div className="grid gap-0 lg:grid-cols-2">
//             <div className="relative p-7 sm:p-10 bg-gradient-to-br from-brand-tint to-white">
//               <div
//                 className="pointer-events-none absolute inset-0"
//                 style={{
//                   background:
//                     "radial-gradient(900px 240px at 15% 0%, rgb(from var(--color-brand) r g b / 0.16) 0%, rgb(from var(--color-brand) r g b / 0) 60%)",
//                 }}
//               />

//               <h2 className="relative text-2xl font-extrabold tracking-tight text-text">Ready to get approved?</h2>
//               <p className="relative mt-2 text-muted">
//                 Tell us your goal—purchase, refinance, or renewal—and we’ll map your best options.
//               </p>

//               <div className="relative mt-6 flex flex-wrap gap-3" id="book">
//                 <Button href="#apply" icon="✅">Apply Now</Button>
//                 <Button variant="outline" href="tel:6042172992" icon="📞">Call</Button>
//                 <Button variant="outline" href="mailto:Gavin.Sharma@ymscanada.ca" icon="✉️">Email</Button>
//               </div>

//               <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
//                 <div className="rounded-3xl border border-border bg-white/75 p-4 shadow-lg">
//                   <div className="text-xs font-semibold text-muted">Service area</div>
//                   <div className="mt-1 text-sm font-semibold text-text">British Columbia</div>
//                 </div>
//                 <div className="rounded-3xl border border-border bg-white/75 p-4 shadow-lg">
//                   <div className="text-xs font-semibold text-muted">Typical response</div>
//                   <div className="mt-1 text-sm font-semibold text-text">Within 1 business day</div>
//                 </div>
//               </div>
//             </div>

//             <div className="p-7 sm:p-10">
//               <h3 className="text-lg font-extrabold tracking-tight text-text">Send a quick message</h3>
//               <p className="mt-1 text-sm text-muted">Let us know your goals and we'll connect you with a mortgage expert.</p>

//               <form
//                 className="mt-5 grid gap-3"
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   alert("Thanks! We'll contact you shortly.");
//                 }}
//               >
//                 <input className={inputCls} placeholder="Full name" required />
//                 <input className={inputCls} placeholder="Email" type="email" required />
//                 <input className={inputCls} placeholder="Phone" />
//                 <textarea
//                   className="min-h-[110px] rounded-2xl border border-border bg-white/85 px-3 py-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
//                   placeholder="How can we help? (Purchase, refinance, renewal, etc.)"
//                 />
//                 <Button type="submit" className="w-full" icon="📨">
//                   Submit
//                 </Button>

//                 <div className="text-xs text-muted">By submitting, you agree to be contacted about your request.</div>
//               </form>
//             </div>
//           </div>
//         </Card>
//       </Container>
//     </section>
//   );
// }
