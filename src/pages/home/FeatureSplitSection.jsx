import { Link } from "react-router-dom";
import { FiArrowRight, FiHome, FiRefreshCw, FiTrendingUp, FiLayers } from "react-icons/fi";

const solutions = [
  { icon: FiHome, number: "01", title: "Home purchase", text: "Make your next move with a clear budget, a sharper offer and financing built to fit.", href: "/mortgages" },
  { icon: FiRefreshCw, number: "02", title: "Renew or refinance", text: "Turn renewal time into an opportunity to improve cash flow, terms and flexibility.", href: "/services/refinance" },
  { icon: FiTrendingUp, number: "03", title: "Investment property", text: "Purpose-built financing strategies for growing a resilient real estate portfolio.", href: "/services" },
  { icon: FiLayers, number: "04", title: "Equity solutions", text: "Put the value in your home to work for renovations, consolidation or new goals.", href: "/services" },
];

export default function FeatureSplitSection() {
  return <section id="solutions" className="solutions-section"><div className="premium-container">
    <div className="section-heading"><div><div className="eyebrow dark"><span /> Tailored solutions</div><h2>Your goals deserve more than an off-the-shelf mortgage.</h2></div><p>Every recommendation starts with your full financial picture and ends with a strategy you can feel confident signing.</p></div>
    <div className="solution-grid">{solutions.map(({ icon: Icon, number, title, text, href }) => <Link to={href} className="solution-card" key={title}><div className="solution-top"><span>{number}</span><Icon /></div><h3>{title}</h3><p>{text}</p><span className="card-link">Explore solution <FiArrowRight /></span></Link>)}</div>
  </div></section>;
}
