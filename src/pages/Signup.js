import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/Signup.css";

const Signup = ({ handleTokenAndId }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://vinted-backend-55n7.onrender.com/user/signup",

        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      if (response.data.token) {
        handleTokenAndId(response.data.token, response.data._id);

        navigate("/");
        // alert(
        //   "L'équipe vinted clone vous remercie pour votre inscription. Un e-mail vous a été envoyé. Si vous ne trouvez pas l'e-mail, vérifiez votre dossier spam."
        // );
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      if (error.response.data.message === "email already used") {
        setErrorMessage("Cet email est déjà utilisé veuillez créer un email valide");
      }
      if (error.response.data.message === "missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs svp");
      }
      if (error.response.data.message === "User not found") {
        setErrorMessage("Utilisateur non trouvé ");
      }
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form">
        <h1>S'inscrire</h1>
        <input
          value={username}
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        <input
          value={email}
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>
        <input
          value={password}
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>

        <div className="newsletter-checkbox">
          <input
            checked={newsletter}
            type="checkbox"
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          />
          <span>S'inscrire à notre newsletter</span>
        </div>
        <div className="checkbox-paragraph">
          {/* <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p> */}
        </div>

        <div className="submit-wrapper">
          <button className="submit-button" onClick={handleSignup}>
            <span>S'inscrire</span>
          </button>

          <Link to="/login">
            <p>Tu as déjà un compte? Connecte-toi !</p>{" "}
          </Link>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};
export default Signup;
