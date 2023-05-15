import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import "../styles/components/Header.css";

const Header = ({ handleTokenAndId, token, search, setSearch }) => {
  // const token = Cookies.get("token-vinted");
  const navigate = useNavigate();
  return (
    <header>
      <div className="header">
        <Link to="/">
          <img
            src="https://lereacteur-vinted.netlify.app/static/media/logo.10b0caad793dd0a8ea72.png"
            alt=""
          />
        </Link>
        <div className="inputsearch-slider">
          <SearchBar search={search} setSearch={setSearch} />
          <div className="slider-price">
            <label for="volume">Prix entre : </label>
            <input type="range" id="volume" name="volume" min="0" max="11" />
          </div>
        </div>

        {/* Si le token existe on affiche deconnexion sinon s'inscrire et se connecter */}
        {token ? (
          <button
            style={{
              backgroundColor: "#C2175B",
              color: "white",
              border: "none",
            }}
            onClick={() => {
              // Cookies.remove("token-vinted");
              handleTokenAndId(null, null);
              navigate("/");
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
        <Link to={token ? "/publish" : "/login"}>
          <button
            style={{
              fontSize: "12px",
              color: "white",
              backgroundColor: "#56bfc7",
            }}
          >
            Vends tes articles
          </button>
        </Link>
      </div>
    </header>
  );
};
export default Header;
