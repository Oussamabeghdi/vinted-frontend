import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = ({ handleToken, token, search, setSearch }) => {
  // const token = Cookies.get("token-vinted");

  return (
    <header>
      <div className="header">
        <SearchBar search={search} setSearch={setSearch} />

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
        <Link to={token ? "/publish" : "/login"}>
          <button className="sell">Vends tes articles</button>
        </Link>
      </div>
    </header>
  );
};
export default Header;
