import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
// import { useState } from "react";

const Header = ({ handleToken, token, search, setSearch }) => {
  // const token = Cookies.get("token-vinted");
  // const [search, setSearch] = useState();

  return (
    <header>
      <SearchBar search={search} setSearch={setSearch} />

      {/* <img
        style={{ height: 100, width: 100 }}
        src="../public/img/logovinted.png"
        alt=""
      ></img>
      <input
        style={{
          borderRadius: 10,
          width: 400,
          justifyContent: "space-around",
        }}
        type="text"
        placeholder="Recherche des articles"
       
      /> */}

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
      {/* <input
        style={{
          borderRadius: 10,
          width: 400,
          justifyContent: "space-around",
        }}
        value={search}
        type="text"
        placeholder="Recherche des articles..."
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      ></input> */}
    </header>
  );
};
export default Header;
