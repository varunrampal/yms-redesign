export default function GuaranteeSection() {
const bullets = [
"Expert advice backed by 10+ years of experience",
"Multiple lenders competing for your business",
"Fast, responsive, personal service",
];


return (
<section className="relative overflow-hidden bg-white py-20">
{/* Watermark */}
<div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none">
<div className="pl-6 text-[110px] font-extrabold leading-none tracking-tight text-slate-200/70 md:pl-10 md:text-[180px]">
Approved
</div>
</div>


<div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
{/* Left headline */}
<div>
<div className="mb-6 h-1 w-20 bg-[#0069a8]" />
<h3 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
Getting You
<br />
<span className="text-slate-600">Pre-Approved in 5 Hours!</span>
</h3>
</div>


{/* Right bullets */}
<div className="md:pl-8">
<p className="text-lg font-semibold text-slate-900">
Work with me and I guarantee you will:
</p>


<ul className="mt-8 space-y-5">
{bullets.map((b) => (
<li key={b} className="flex items-start gap-4">
<span className="mt-1 inline-block h-0 w-0 border-y-[7px] border-y-transparent border-l-[10px] border-l-[#0069a8]" />
<span className="text-lg text-slate-900">{b}</span>
</li>
))}
</ul>
</div>
</div>
</section>
);
}