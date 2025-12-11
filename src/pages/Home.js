import { useEffect, useState } from "react";
import axios from "axios";
import OfferCard from "../components/OfferCard";
import SearchBar from "../components/SearchBar";
import "../styles/pages/Home.css";
import "../styles/components/SkeletonCard.css";
import { TearSvg } from "../assets/svg/Tear";
import { Link } from "react-router-dom";
import SkeletonCard from "../components/SkeletonCard";

const Home = ({ search, token, setSearch }) => {
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-backend-55n7.onrender.com/offers?title=${search}`
        );
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);

  return (
    <section className="home-wrapper-container">
      <div className="searchBar-mobile-display">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="home-wrapper">
        <div className="home-tear">
          <TearSvg />
        </div>
        <div className="home-info">
          <h1 className="home-title-info">Prêts à faire du tri dans vos placards?</h1>
          <Link to={token ? "/publish" : "login"} className="home-button">
            Commencer à vendre
          </Link>
        </div>
      </div>
      <div className="cards-wrapper">
        {isLoading ? (
          [...Array(8)].map((_, index) => <SkeletonCard key={index} />)
        ) : data && data.offers.length > 0 ? (
          data.offers
            .filter((offer) => {
              if (search.length < 3) return true;
              return offer.product_name.toLowerCase().includes(search.toLowerCase());
            })
            .map((offer) => <OfferCard offerInfos={offer} key={offer._id} />)
        ) : (
          <p>Aucun produit trouvé correspondant</p>
        )}
      </div>
    </section>
  );
};
export default Home;
