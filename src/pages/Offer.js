import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  const Navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    Navigate("/payment", {
      state: {
        title: `${data.product_name}`,
        price: `${data.product_price}`,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
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
    <div>
      <img src={data.product_image.secure_url} alt="" />
      <p>{data.product_price} €</p>
      {data.product_details.map((detail, index) => {
        const key = Object.keys(detail)[0];
        // console.log({detail[key]});
        return (
          <div>
            <span>{key} :</span>
            <span> {detail[key]}</span>
          </div>
        );
      })}
      {/* <Link to="/payment"> */}
      <div className="infos">
        <p>{data.product_name}</p>
        <p>{data.produce_description}</p>
        <p>{data.owner.account.username}</p>
      </div>

      <button onClick={handleSubmit} type="submit">
        Acheter
      </button>
      {/* </Link> */}
    </div>
  );
};
export default Offer;
