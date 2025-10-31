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
        console.log("fetching data ...");

        const response = await axios.get(
          // `http://localhost:3000/offers?title=${search}&priceMin=10&priceMax=500&page=1&sort=asc`
          `https://site--vinted-backend--9gtnl5qyn2yw.code.run/offers?title=${search}&priceMin=10&priceMax=500&page=1&sort=asc`
          //
        );
        console.log("Response received : ", response.data);
        setData(response.data);
        // console.log(`ceci est la data : ${JSON.stringify(data, null, 2)} `);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p style={{ padding: "10px" }}> Loading...</p>
  ) : (
    <section className="home-wrapper-container">
      <div className="home-wrapper">
        <div className="home-info">
          <h1 className="home-title-info">Prêts à faire du tri dans vos placards?</h1>
          <Link to={token ? "/publish" : "login"} className="home-button">
            Commencer à vendre
          </Link>
        </div>
        <div className="home-tear">
          <TearSvg />
        </div>
      </div>
      <div className="cards-wrapper">
        {data && Array.isArray(data.offers) && data.offers.length > 0 ? (
          data.offers.map((offer) => {
            return <OfferCard offerInfos={offer} key={offer._id} />;
          })
        ) : (
          <p>Aucun produit touvé correspondant</p>
        )}
      </div>
    </section>
  );
};
export default Home;
