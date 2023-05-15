import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/Signup.css";

const Signup = ({ handleTokenAndId }) => {
  // States qui gèrent mes inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  //   créer un state pour la réponse d'erreur à la création de l'email
  const [errorMessage, setErrorMessage] = useState("");

  // une fois que jai enregistrer le token ds le cookies je veux naviguer vers la page home
  const navigate = useNavigate();

  // fonction qui sera appelée quand je clique sur submit pour pas quil ait de rafraichissement au click
  const handleSignup = async (event) => {
    event.preventDefault();

    // je fais disparaitre le message d'erreur
    setErrorMessage("");
    try {
      const response = await axios.post(
        // "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        "https://site--vinted-backend--9gtnl5qyn2yw.code.run/user/signup",
        // "http://localhost:3000/user/signup",

        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      // si je recois bien un token
      if (response.data.token) {
        // je l'enregistre dans mon state et mes cookies
        handleTokenAndId(response.data.token, response.data._id);
        // Cookies.set("token-vinted", response.data.token, { expire: 14 });
        // et je redirige vers home
        navigate("/");
      }
      //   pour avoir l'erreur du serveur
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      if (error.response.data.message === "email already used") {
        setErrorMessage(
          "Cet email est déjà utilisé veuillez créer un email valide"
        );
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

          {/* si erreur message existe alors on l'affiche  */}

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
