import { useEffect, useState } from "react";
import axios from "axios";
import OfferCard from "../components/OfferCard";
import SearchBar from "../components/SearchBar";
import "../styles/pages/Home.css";
import { TearSvg } from "../assets/svg/Tear";
import { Link } from "react-router-dom";

const Home = ({ search, token, setSearch }) => {
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:3000/offers?title=${search}&priceMin=10&priceMax=500&page=1&sort=asc`
          //
          `https://vinted-backend-55n7.onrender.com/offers?title=${search}&priceMin=10&priceMax=500&page=1&sort=asc`
        );
        // on ne filtre qu’à partir de 3 lettres
        setData(response.data);
        // const filteredData = data.filter((item) => {
        //   if (search.length < 3) return true;
        //   // vérifie que la recherche correspond (insensible à la casse)
        //   return item.title.toLowerCase().includes(search.toLowerCase());
        // });

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
        {data && Array.isArray(data.offers) && data.offers.length > 0 ? (
          data.offers
            .filter((offer) => {
              if (search.length < 3) return true;
              return offer.product_name.toLowerCase().includes(search.toLowerCase());
            })

            .map((offer) => {
              return <OfferCard offerInfos={offer} key={offer._id} />;
            })
        ) : (
          <p>Aucun produit trouvé correspondant</p>
        )}
      </div>
    </section>
  );
};
export default Home;
