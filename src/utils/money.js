export function parseDigitsToNumber(value) {
  const digits = String(value ?? "").replace(/[^0-9]/g, "");
  return Number(digits || "0");
}

export function formatMoney(n) {
  if (!Number.isFinite(n)) return "";
  return n.toLocaleString("en-CA", { maximumFractionDigits: 0 });
}
