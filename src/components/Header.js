import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = ({ handleToken, token, search, setSearch }) => {
  // const token = Cookies.get("token-vinted");

  return (
    <header>
      <div className="header">
        <SearchBar search={search} setSearch={setSearch} />
        {/* <SlideBar /> */}

        {/* Si le token existe on affiche deconnexion sinon s'inscrire et se connecter */}
        {token ? (
          <button
            onClick={() => {
              // Cookies.remove("token-vinted");
              handleToken(null);
            }}
          >
            Se Déconnecter
          </button>
        ) : (
          <>
            <Link to="/signup">
              <button>s'inscrire</button>
            </Link>

            <Link to="/login">
              <button>se connecter</button>
            </Link>
          </>
        )}
      </div>
      <img
        style={{ height: 340, width: 1325, objectFit: "cover" }}
        src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
      ></img>
    </header>
  );
};
export default Header;
