import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";

const Login = ({ handleToken }) => {
  // on crée deux state pour avoir acces en permanence aux valeur de nos input et pour recuperer ces valeurs on fait onchange et onclick pour le bouton se connecter
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        // Cookies.set("token-vinted", response.data.token, { expire: 14 });
        handleToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  // au niveau de la balise forme on fait un onsubmit
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column", gap: 30 }}
        onSubmit={handleLogin}
      >
        <h1>Login</h1>
        <input
          value={email}
          type="email"
          placeholder="Email"
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
        <input type="submit" value="Se connecter" />
        <Link to="/signup">Pas encore de compte ? Inscris-toi</Link>
      </form>
    </div>
  );
};
export default Login;
