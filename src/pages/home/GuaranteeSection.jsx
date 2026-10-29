import { Link } from "react-router-dom";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";

export default function GuaranteeSection() {
  return <section className="advisor-section"><div className="premium-container advisor-grid">
    <div className="advisor-image"><img src="/featured-section-image.jpg" alt="A modern home in British Columbia" /><div className="experience-seal"><strong>10+</strong><span>years of trusted<br/>advice</span></div></div>
    <div className="advisor-copy"><div className="eyebrow"><span /> The Apex Prime approach</div><h2>Advice that sees the whole picture.</h2><p>Getting approved is only one part of the journey. We help you understand the trade-offs, anticipate what comes next and make a decision that supports your life beyond closing day.</p>
      <ul><li><FiCheckCircle /><span><strong>Independent perspective</strong>Access to banks, credit unions and alternative lenders.</span></li><li><FiCheckCircle /><span><strong>Clear, proactive communication</strong>No jargon. No wondering what happens next.</span></li><li><FiCheckCircle /><span><strong>Strategy for the long term</strong>A mortgage that works today and evolves with you.</span></li></ul>
      <Link to="/mortgageapplication" className="text-link">Discover your best path <FiArrowUpRight /></Link>
    </div>
  </div></section>;
}
