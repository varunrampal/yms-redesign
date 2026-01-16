import React, { useMemo, useState } from "react";
import Container from "../../components/layout/Container.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import { formatMoney, parseDigitsToNumber } from "../../utils/money.js";

export default function QuoteStrip() {
  const [form, setForm] = useState({ price: "", down: "", city: "", email: "", phone: "" });

  const numeric = useMemo(() => {
    const price = parseDigitsToNumber(form.price);
    const down = parseDigitsToNumber(form.down);
    return { price, down, loan: Math.max(price - down, 0) };
  }, [form.price, form.down]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    // NOTE: must use \n for new lines (avoids “Unterminated string constant”)
    alert("Thanks! We'll reach out soon.\n\nEstimated loan amount: $" + formatMoney(numeric.loan));
  }

  const inputCls =
    "h-11 w-full rounded-2xl border border-border bg-white/85 px-3 text-sm outline-none focus:border-brand focus:ring-4 focus:ring-brand/10";

  return (
    <section id="apply">
      <Container className="py-10 sm:py-14">
        <Card className="relative overflow-hidden p-5 sm:p-6">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(900px 240px at 10% 0%, rgb(from var(--color-brand) r g b / 0.12) 0%, rgb(from var(--color-brand) r g b / 0) 60%)",
            }}
          />

          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-text">Let’s Connect</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>Instant estimate</Badge>
                <Badge>1 business day response</Badge>
              </div>
              <p className="mt-2 text-sm text-muted">No obligation. We’ll reply with best-fit options.</p>
            </div>
            <div className="text-sm text-muted">
              Est. loan: <span className="font-semibold text-text">${formatMoney(numeric.loan) || "—"}</span>
            </div>
          </div>

          <form onSubmit={onSubmit} className="relative mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            <input className={inputCls} placeholder="Home price" name="price" value={form.price} onChange={onChange} inputMode="numeric" />
            <input className={inputCls} placeholder="Down payment" name="down" value={form.down} onChange={onChange} inputMode="numeric" />
            <input className={inputCls} placeholder="City" name="city" value={form.city} onChange={onChange} />
            <input className={inputCls} placeholder="Email" type="email" name="email" value={form.email} onChange={onChange} required />
            <input className={inputCls} placeholder="Phone" name="phone" value={form.phone} onChange={onChange} />
            <Button type="submit" className="h-11 w-full" icon="✨">
              See My Options
            </Button>
          </form>
        </Card>
      </Container>
    </section>
  );
}
