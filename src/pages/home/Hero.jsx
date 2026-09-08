import { Link } from "react-router-dom";
import { FiArrowUpRight, FiCheck, FiChevronDown } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="hero-shell">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <div className="premium-container hero-grid">
        <div className="hero-copy reveal-up">
          <div className="eyebrow"><span /> Mortgage strategy, elevated</div>
          <h1>A better mortgage begins with a <em>better conversation.</em></h1>
          <p className="hero-lede">Bespoke mortgage guidance for homeowners, buyers and investors across British Columbia—built around your ambitions, not a bank's agenda.</p>
          <div className="hero-actions">
            <Link to="/mortgageapplication" className="premium-button gold-button">Start your application <FiArrowUpRight /></Link>
            <a href="tel:18334989898" className="premium-button ghost-button">Speak with Gaurav</a>
          </div>
          <div className="hero-proof">
            <div><strong>10+</strong><span>Years of experience</span></div><div><strong>50+</strong><span>Lender options</span></div><div><strong>1:1</strong><span>Personal guidance</span></div>
          </div>
        </div>
        <div className="hero-visual reveal-up delay-one">
          <div className="portrait-frame">
            <div className="portrait-glow" /><img src="/gaurav.png" alt="Gaurav Sharma, Mortgage Advisor" />
            <div className="portrait-card"><span className="status-dot" /><div><strong>Gaurav Sharma</strong><small>Mortgage Advisor</small></div></div>
            <div className="approval-card"><FiCheck /><span><small>Strategy call</small><strong>Complimentary</strong></span></div>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#solutions" aria-label="Explore mortgage solutions"><span>Explore</span><FiChevronDown /></a>
    </section>
  );
}
