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
          // `http://localhost:3000/offers?title=${search}&priceMin=10&priceMax=500&page=1&sort=asc`
          // `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&priceMin=10&priceMax=500&page=1&sort=asc`
          `https://site--vinted-backend--9gtnl5qyn2yw.code.run/offers?title=${search}&priceMin=10&priceMax=500&page=1&sort=asc`
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
    <section>
      <div>
        <img
          style={{
            height: 340,
            width: "100%",
            objectFit: "cover",
          }}
          src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
          alt=""
        />
      </div>
      <div className="grid-container">
        {data.offers.map((offer) => {
          return <OfferCard offerInfos={offer} key={offer._id} />;
        })}
      </div>
    </section>
  );
};
export default Home;
