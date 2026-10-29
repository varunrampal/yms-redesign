import { FiStar } from "react-icons/fi";

const reviews = [
  { name: "Brittney Smith", text: "Clear guidance, fast responses, and a smooth closing—even with a tight timeline." },
  { name: "Manjeet Sidhu", text: "Gaurav helped us compare lenders and find the right structure. We felt informed at every step." },
  { name: "Amandeep Singh", text: "He found a path forward after our bank said no. Professional, transparent and incredibly responsive." },
];

export default function Reviews() {
  return <section className="reviews-section" id="reviews"><div className="premium-container"><div className="review-heading"><div className="eyebrow dark"><span /> Client stories</div><h2>Confidence, from first call to closing.</h2></div><div className="reviews-grid">{reviews.map((review, index) => <article className="review-card" key={review.name}><div className="stars">{[1,2,3,4,5].map(n => <FiStar key={n} />)}</div><blockquote>“{review.text}”</blockquote><div className="review-author"><span>{review.name.split(" ").map(n => n[0]).join("")}</span><div><strong>{review.name}</strong><small>Verified client</small></div><b>0{index + 1}</b></div></article>)}</div></div></section>;
}
