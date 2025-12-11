import "../styles/components/SkeletonCard.css";

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-price"></div>
    </div>
  );
}
