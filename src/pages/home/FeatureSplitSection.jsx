import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function FeatureSplitSection() {
return (
<section className="bg-[#efefef] py-14 md:py-20">
<div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
{/* Left image card */}
<div className="relative">
<div className="overflow-hidden rounded-[44px] rounded-bl-[120px] bg-white shadow-xl ring-1 ring-slate-200">
<img
src="/featured-section-image.jpg"
alt="Happy family"
className="h-[360px] w-full object-cover md:h-[520px]"
/>
</div>
</div>


{/* Right content */}
<div className="md:pl-10">
<div className="h-1 w-24 bg-[#0069a8]" />


<h2 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
Gaurav Sharma</h2>

<h2 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-2xl">Mortgage Advisor</h2>



<p className="mt-6 text-lg text-slate-800">
Simple process. Honest advice. The right mortgage for your next move.
</p>


<p className="mt-5 max-w-xl leading-relaxed text-slate-800">
With 10+ years of experience, I offer clear, honest guidance and mortgage solutions tailored to your goals—so you feel confident at every step.
From first-time purchases and refinancing to investing, debt consolidation, and home equity access, we’ll choose the best option for your future plan.
</p>


<div className="mt-10">

  <Button href="/mortgageapplication" icon="✅">
   Apply Now
  </Button>
</div>
</div>
</div>
</section>
);
}