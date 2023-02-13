import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { error } from "console";

const Signup = ({ handleToken }) => {
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
      // je fais une requete en post: 1 argument l'url que j'interroge
      //   et en 2eme argument j'envoie les infos de l'utilisateur (username,email,password...)
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",

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
        handleToken(response.data.token);
        // Cookies.set("token-vinted", response.data.token, { expire: 14 });
        // et je redirige vers home
        navigate("/");
      }
      //   pour avoir l'erreur du serveur
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      //   si lerreur est egale a this email hase already an account je vais devoir
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage(
          "Cet email est déjà utilisé veuillez créer un email valide"
        );
      }
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs svp");
      }
      if (error.response.data.message === "User not found") {
        setErrorMessage("Utilisateur non trouvé ");
      }
    }
  };

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column", gap: 30 }}
        onSubmit={handleSignup}
      >
        {/* quand le contenu change je veux recuperer qui a eu lieu et la nouvelle valeur de mon state je veux que ça soit event .target.value */}
        <h1>Signup</h1>
        <input
          value={username}
          type=" text"
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
        <div>
          <input
            checked={newsletter}
            type="checkbox"
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          />
          <span>S'inscrire à notre newsletter</span>
        </div>

        <input type="submit" value="s'inscrire"></input>
        {/* si erreur message existe alors on l'affiche */}
        {errorMessage && (
          <p style={{ color: "red" }}>"utilisateur non trouvé"{errorMessage}</p>
        )}
        <Link to="/login">Tu as déja un compte, connecte-toi</Link>
      </form>
    </section>
  );
};
export default Signup;
