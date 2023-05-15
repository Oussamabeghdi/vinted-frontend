import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <div className="offer-bloc">
      <div>
        <img src={data.product_image.secure_url} alt="product" />
      </div>
      <p>{data.product_price} €</p>
      {/* Je parcours product_details */}
      {data.product_details.map((detail, index) => {
        //Je recupère le nom de la clé de detail
        const key = Object.keys(detail)[0];
        console.log(detail[key]);
        return (
          <div key={index}>
            <span>{key} :</span>
            <span> {detail[key]}</span>
          </div>
        );
      })}

      <div className="offer-infos">
        <p>{data.product_name}</p>
        <p>{data.produce_description}</p>
        <p>{data.owner.account.username}</p>
      </div>
      <Link to={token ? "/payment" : "/login"} state={token ? data : null}>
        ACHETER
      </Link>
    </div>
  );
};
export default Offer;
