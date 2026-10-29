import { Link } from "react-router-dom";
import { FiArrowUpRight, FiInstagram, FiFacebook, FiMail, FiPhone } from "react-icons/fi";

export default function Footer() {
  return <footer className="premium-footer"><div className="premium-container">
    <div className="footer-cta"><div><div className="eyebrow"><span /> Your next move</div><h2>Let's make your mortgage work harder.</h2></div><Link to="/mortgageapplication" className="premium-button gold-button">Start a conversation <FiArrowUpRight /></Link></div>
    <div className="footer-grid"><div className="footer-brand"><Link to="/" className="brand-lockup light"><img src="/apex-prime-logo.jpeg" alt="Apex Prime Mortgages" /><span><strong>APEX PRIME</strong><small>MORTGAGES</small></span></Link><p>Clear strategy. Thoughtful advice.<br/>A mortgage designed around you.</p></div><div><h3>Explore</h3><Link to="/services">Solutions</Link><Link to="/mortgages">Mortgage types</Link><Link to="/affordability">Calculators</Link><Link to="/faq">FAQ</Link></div><div><h3>Connect</h3><a href="tel:18334989898"><FiPhone /> 1-833-498-9898</a><a href="mailto:gavin.sharma@ymscanada.ca"><FiMail /> Email Gaurav</a><span>Abbotsford, British Columbia</span></div><div><h3>Follow</h3><div className="social-row"><a href="#" aria-label="Instagram"><FiInstagram /></a><a href="#" aria-label="Facebook"><FiFacebook /></a></div></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Apex Prime Mortgages</span><span>Independent mortgage guidance for British Columbia.</span></div>
  </div></footer>;
}
