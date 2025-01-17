import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/pages/Offer.css";

const Offer = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:3000/offer/${id}`
          `https://site--vinted-backend--9gtnl5qyn2yw.code.run/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <section className="offer-wrapper">
      <img className="offer-image" src={data?.product_image?.secure_url} alt="product" />
      <div className="offer-details-wrapper">
        <p className="offer-price">{data?.product_price} €</p>
        {/* Je parcours product_details */}
        <div className="offer-details-list">
          {data?.product_details.map((detail, index) => {
            //Je recupère le nom de la clé de detail
            const key = Object.keys(detail)[0];

            return (
              <div className="offer-details" key={`detail n°: ${index}`}>
                <p className="key">{key} :</p>
                <p className="detail-key"> {detail[key]} </p>
              </div>
            );
          })}
        </div>
        <div className="divider"></div>
        <div className="offer-infos">
          <p className="offer-infos-title">{data?.product_name}</p>
          <p className="offer-infos-description">{data?.product_description}</p>
          <p className="offer-infos-username">{data?.owner.account.username}</p>
        </div>
        <div className="buy-button">
          <Link to={token ? "/payment" : "/login"} state={token ? data : null}>
            <span>Acheter</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Offer;
