import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import "../styles/components/Header.css";
import Logo from "../assets/img/logovinted.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserXmark } from "@fortawesome/free-solid-svg-icons";

const Header = ({ handleTokenAndId, token, search, setSearch }) => {
  // const token = Cookies.get("token-vinted");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="header-wrapper">
      <div className="logo-link-toggle-menu-container">
        <div className="logo-link">
          <Link to="/">
            <img src={Logo} alt="logo Vinted" />
          </Link>
          <Link to={token ? "/" : "/login"}>
            <FontAwesomeIcon
              className="faUser"
              icon={token ? faUser : faUserXmark}
              style={{ color: token ? "green" : "#cbcdceff" }}
              size={20}
            />
          </Link>
        </div>
      </div>
      <div className="inputsearch-slider">
        <SearchBar search={search} setSearch={setSearch} />
      </div>
      <div className="nav-container">
        {token && (
          <>
            <Link className="cart-hdr-link" to={token ? "/cart" : "/login"}>
              <FontAwesomeIcon icon={token ? faCartShopping : null} />
              {cart?.length}
            </Link>
          </>
        )}
        <div className={`publish-login-btn-container ${isMenuOpen ? "open" : ""}`}>
          {token ? (
            <>
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
            </>
          ) : (
            <>
              <Link to="/signup">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>s'inscrire</button>
              </Link>

              <Link to="/login">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>se connecter</button>
              </Link>
            </>
          )}

          <Link to={token ? "/publish" : "/login"}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
      </div>
      <div className="menu-mobile">
        <button className="menu-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} size="2x" />{" "}
        </button>
      </div>
    </div>
  );
};
export default Header;
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import SearchBar from "./SearchBar";
// import "../styles/components/Header2.css";
// import Logo from "../assets/img/logovinted.png";

// const Header = ({ token, handleTokenAndId, search, setSearch }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

//   return (
//     <header className="header">
//       <div className="logo-link">
//         <Link to="/">
//           <img src={Logo} alt="Logo Vinted" />
//         </Link>
//       </div>

//       {/* Menu toggle (burger) */}
//       <button className="menu-toggle" onClick={toggleMenu}>
//         ☰
//       </button>

//       {/* Barre de recherche */}
//       <div className={`searchbar-button-container ${isMenuOpen ? "open" : ""}`}>
//         <div className="inputsearch-slider">
//           <SearchBar search={search} setSearch={setSearch} />
//         </div>
//       </div>

//       {/* Boutons connexion/publication */}
//       <div className={`publish-login-btn-container ${isMenuOpen ? "open" : ""}`}>
//         {token ? (
//           <button
//             onClick={() => {
//               handleTokenAndId(null, null);
//               navigate("/");
//             }}
//             style={{ backgroundColor: "#C2175B", color: "white" }}
//           >
//             Se déconnecter
//           </button>
//         ) : (
//           <>
//             <Link to="/signup">
//               <button>S'inscrire</button>
//             </Link>
//             <Link to="/login">
//               <button>Se connecter</button>
//             </Link>
//           </>
//         )}
//         <Link to={token ? "/publish" : "/login"}>
//           <button style={{ backgroundColor: "#56bfc7", color: "white" }}>Vends tes articles</button>
//         </Link>
//       </div>
//     </header>
//   );
// };

// export default Header;
