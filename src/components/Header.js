import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import "../styles/components/Header.css";
import Logo from "../assets/img/logovinted.png";
// import SuperSimple from "./Slider";

const Header = ({ handleTokenAndId, token, search, setSearch }) => {
  // const token = Cookies.get("token-vinted");
  const navigate = useNavigate();
  return (
    <header>
      <div className="header">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
        <div className="inputsearch-slider">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        {/* <SuperSimple /> */}

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
