import Hero from "./home/Hero.jsx";
import FeatureSplitSection from "./home/FeatureSplitSection.jsx";
import GuaranteeSection from "./home/GuaranteeSection.jsx";
import Reviews from "./home/Reviews.jsx";
import StickyMobileCTA from "../components/footer/StickyMobileCTA.jsx";

export default function Home() { return <div className="premium-home"><Hero /><FeatureSplitSection /><GuaranteeSection /><Reviews /><StickyMobileCTA /></div>; }
