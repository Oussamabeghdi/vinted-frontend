import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/pages/Login.css";

const Login = ({ handleTokenAndId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post("https://vinted-backend-55n7.onrender.com/user/login", {
        email: email,
        password: password,
      });
      if (response.data.token) {
        handleTokenAndId(response.data.token, response.data._id);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);

      if (error.response.data.message === "Unauthorized") {
        setErrorMessage("Votre email ou mot de passe est incorrect");
      }

      if (error.response.data.message === "Unauthorized") {
        setErrorMessage("Votre email ou mot de passe est incorrect");
      }
    }
  };
  return (
    <div className="login-page">
      <form className="login-form">
        <h1>Se connecter</h1>

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
