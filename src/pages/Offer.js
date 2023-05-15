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

  // const navigate = useNavigate();
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:3000/offer/${id}`
          // `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
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
    <section className="offer">
      <div className="offer-bloc">
        <div className="col-left">
          <img src={data.product_image.secure_url} alt="product" />
        </div>
        <div className="col-right">
          <p className="offer-price">{data.product_price} €</p>
          {/* Je parcours product_details */}
          {data.product_details.map((detail, index) => {
            //Je recupère le nom de la clé de detail
            const key = Object.keys(detail)[0];
            console.log(detail[key]);
            return (
              <div className="offer-details">
                <div key={index}>
                  <span className="key">{key} :</span>
                  <span className="detail-key"> {detail[key]}</span>
                </div>
              </div>
            );
          })}
          <div className="offer-infos">
            <p>{data.product_name}</p>
            <p>{data.produce_description}</p>
            <p>{data.owner.account.username}</p>
          </div>
          <div className="buy-button">
            <Link
              to={token ? "/payment" : "/login"}
              state={token ? data : null}
            >
              <span>Acheter</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Offer;
