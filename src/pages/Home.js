import { useEffect, useState } from "react";
import axios from "axios";
import OfferCard from "../components/OfferCard";
import "../styles/pages/Home.css";
import { TearSvg } from "../assets/svg/Tear";
import { Link } from "react-router-dom";

const Home = ({ search, token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:3000/offers"
          // `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&priceMin=10&priceMax=500&page=1&sort=asc`
          `https://site--vinted-backend--9gtnl5qyn2yw.code.run/offers?title=${search}&priceMin=10&priceMax=500&page=1&sort=asc`
        );
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
      <div className="home-wrapper">
        <div className="home-info">
          <p className="home-title-info">
            Prêts à faire du tri dans vos placards ?
          </p>
          <Link to={token ? "/publish" : "login"} className="home-button">
            Commencer à vendre
          </Link>
        </div>
        <div className="home-tear">
          <TearSvg />
        </div>
      </div>
      <div className="cards-wrapper">
        {data.offers.map((offer) => {
          return <OfferCard offerInfos={offer} key={offer._id} />;
        })}
      </div>
    </section>
  );
};
export default Home;
