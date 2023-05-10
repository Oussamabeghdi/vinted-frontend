import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const Header = ({ handleTokenAndId, token, search, setSearch }) => {
  // const token = Cookies.get("token-vinted");
  const navigate = useNavigate();
  return (
    <header>
      <div className="header">
        <Link to="/">
          <img
            style={{ height: 100, width: 100, marginRight: "50px" }}
            src="https://www.vinted.fr/assets/web-logo/default/logo.svg"
            alt=""
          />
        </Link>
        <SearchBar search={search} setSearch={setSearch} />

        {/* Si le token existe on affiche deconnexion sinon s'inscrire et se connecter */}
        {token ? (
          <button
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
