import { Link } from "react-router-dom";
import { useMemo } from "react";
import "../styles/components/OfferCard.css";

const OfferCard = ({ offerInfos }) => {
  const account = useMemo(() => offerInfos?.owner?.account, [offerInfos]);
  // console.log(offerInfos, "");
  return (
    <article className="card-wrapper">
      <div className="card-header">
        {/* Si le vendeur a un avatar, je l'affiche */}

        {account?.avatar &&
          ((<img src={account.avatar?.secure_url} alt="owner" />),
          console.log(offerInfos.username))}
        <p className="card-username">{offerInfos?.username}</p>
      </div>
      <Link className="card-details-link" to={`/offer/${offerInfos._id}`}>
        <img className="image-offer" src={offerInfos.product_image.secure_url} alt="product" />
        <div className="card-footer">
          <p className="card-price">{offerInfos.product_price} € </p>
          {/* je parcours product_details */}
          {offerInfos.product_details.map((detail, index) => {
            if (detail.TAILLE || detail.MARQUE) {
              return <p key={index}>{detail.TAILLE || detail.MARQUE}</p>;
            }

            return null;
          })}
        </div>
      </Link>
    </article>
  );
};
export default OfferCard;
