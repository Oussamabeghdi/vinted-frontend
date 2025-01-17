import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/pages/Login.css";

const Login = ({ handleTokenAndId }) => {
  // on crée deux state pour avoir acces en permanence aux valeur de nos input et pour recuperer ces valeurs on fait onchange et onclick pour le bouton se connecter
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    // navigate("/");
    try {
      const response = await axios.post(
        // "http://localhost:3000/user/login",
        " https://site--vinted-backend--9gtnl5qyn2yw.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        // Cookies.set("token-vinted", response.data.token, { expire: 14 });
        handleTokenAndId(response.data.token, response.data._id);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);

      if (error.response.data.message === "Unauthorized 1") {
        setErrorMessage("Votre email ou mot de passe est incorrect");
      }

      if (error.response.data.message === "Unauthorized") {
        setErrorMessage("Votre email ou mot de passe est incorrect");
      }
    }
  };
  // au niveau de la balise form on fait un onsubmit
  return (
    <div className="login-page">
      <form className="login-form">
        <h1>Se connecter</h1>

        <input
          value={email}
          type="email"
          placeholder="Adresse email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          value={password}
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <div className="submit-wrapper">
          <button className="submit-button" onClick={handleLogin}>
            <span>Se connecter</span>
          </button>
          <Link to="/signup">
            <p>Pas encore de compte ? Inscris-toi !</p>
          </Link>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};
export default Login;
