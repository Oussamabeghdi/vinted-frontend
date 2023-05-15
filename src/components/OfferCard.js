import { Link } from "react-router-dom";
import { useMemo } from "react";
import "../styles/components/OfferCard.css";
const OfferCard = ({ offerInfos }) => {
  const account = useMemo(() => offerInfos?.owner?.account, [offerInfos]);

  return (
    <Link to={`/offer/${offerInfos._id}`}>
      <article>
        <div className="offer-container">
          {/* Si le vendeur a un avatar, je l'affiche */}

          {account?.avatar && (
            <img src={account.avatar?.secure_url} alt="owner" />
          )}
          <span className="offer-container">{account?.username}</span>
        </div>
        <img
          className="image-offer"
          src={offerInfos.product_image.secure_url}
          alt="product"
        />

        <p>{offerInfos.product_price} € </p>
        <div className="offerCard-infos">
          {/* je parcours product_details */}
          {offerInfos.product_details.map((detail, index) => {
            if (detail.TAILLE) {
              return <p key={index}>{detail.TAILLE}</p>;
            } else if (detail.MARQUE) {
              return <p key={index}>{detail.MARQUE}</p>;
            } else {
              return null;
            }
          })}
        </div>
      </article>
    </Link>
  );
};
export default OfferCard;
