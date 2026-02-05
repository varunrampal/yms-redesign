import { useState } from "react";

export default function WhatsAppMortgageBot() {
  const phoneNumber = "919540430778"; // your WhatsApp number (no +)

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("Buy");

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `
🏠 New Mortgage Lead

👤 Name: ${name}
📞 Phone: ${phone}
📌 Type: ${type}

Please select how we may assist you today:

🏡 Buy a Home  
🔄 Refinance or Mortgage Renewal  
📉 Mortgage Rates  
💰 Affordability & Qualification  
👤 Speak with a Mortgage Advisor
    `;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
    setOpen(false);
    setName("");
    setPhone("");
    setType("Buy");
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
    {/* Floating WhatsApp Button */}
<button
  onClick={() => setOpen(true)}
  aria-label="Chat on WhatsApp"
  className="fixed bottom-5 right-5 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition hover:scale-105"
>
  {/* Pulse Ring */}
  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />

  {/* WhatsApp Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="white"
    className="relative h-7 w-7"
  >
    <path d="M19.11 17.205c-.28-.14-1.65-.815-1.906-.908-.255-.093-.442-.14-.628.14-.187.28-.722.908-.885 1.094-.163.187-.326.21-.606.07-.28-.14-1.183-.435-2.252-1.387-.831-.741-1.392-1.656-1.555-1.936-.163-.28-.018-.43.122-.57.126-.125.28-.326.42-.49.14-.163.187-.28.28-.466.093-.187.047-.35-.023-.49-.07-.14-.628-1.512-.86-2.07-.226-.544-.456-.47-.628-.48-.163-.007-.35-.01-.536-.01-.187 0-.49.07-.746.35-.255.28-.98.96-.98 2.343 0 1.384 1.005 2.723 1.145 2.91.14.187 1.98 3.03 4.8 4.248.67.29 1.193.463 1.6.592.672.214 1.283.184 1.766.112.538-.08 1.65-.674 1.884-1.325.233-.65.233-1.208.163-1.325-.07-.117-.256-.187-.536-.327zM16.003 3C9.373 3 4 8.373 4 15.003c0 2.65.865 5.1 2.33 7.078L4 29l7.096-2.297a11.94 11.94 0 0 0 4.907 1.04h.003c6.63 0 12-5.373 12-12 0-6.63-5.37-12-12-12zm0 21.743h-.003a9.93 9.93 0 0 1-4.92-1.3l-.353-.21-4.21 1.36 1.37-4.102-.23-.37a9.93 9.93 0 1 1 8.346 4.622z" />
  </svg>
</button>



      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Chat with a Mortgage Advisor
            </h3>

            {/* Mortgage Type */}
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                I want to
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
              >
                <option value="Buy">Buy a Home</option>
                <option value="Refinance">Refinance / Renewal</option>
              </select>
            </div>

            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />

            {/* Phone */}
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />

            {/* CTA */}
            <button
              type="submit"
              className="w-full rounded-xl bg-green-500 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
            >
              Start WhatsApp Chat
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-3 w-full text-center text-xs text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
}
