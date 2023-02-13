import { useEffect, useState } from "react";
import axios from "axios";
import OfferCard from "../components/OfferCard";

const Home = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&priceMin=10&priceMax=500&limit=15&page=1`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="grid-container">
      {data.offers.map((offer) => {
        return <OfferCard offerInfos={offer} key={offer._id} />;
      })}
    </div>
  );
};
export default Home;
