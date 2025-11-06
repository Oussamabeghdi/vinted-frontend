import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Cookies from "js-cookie";
import "../styles/components/CheckOutForm.css";

const CheckoutForm = ({ token, product_name, product_price }) => {
  const [paymentStatus, setPaymentStatus] = useState(0);
  const { cart, clearCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const userId = Cookies.get("id-vinted");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setPaymentStatus(1);
      const cardElement = elements.getElement(CardElement);
      // console.log("cardElement : " + cardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });
      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        // "http://localhost:3000/payment",
        "https://vinted-backend-55n7.onrender.com/payment",
        {
          stripeToken: stripeToken,
          title: product_name,
          amount: Math.round(product_price * 100),
          items: cart,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setPaymentStatus(2);

        setTimeout(() => {
          clearCart();
          navigate("/");
        }, 5000);
      } else {
        setPaymentStatus(3);
      }
    } catch (error) {
      console.log(error.message);
      setPaymentStatus(3);
    }
  };

  return (
    <form
      style={{
        gap: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      onSubmit={handleSubmit}
    >
      <h1>Formulaire de paiement</h1>
      <div
        className="cardElement"
        style={{
          opacity: paymentStatus === 2 ? 0.3 : 1,
          pointerEvents: paymentStatus === 2 ? "none" : "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardElement />
      </div>

      {paymentStatus === 2 ? (
        <div className="message-success">
          <p>Paiement confirmé</p>
          <p>{`Vous avez été débité de ${product_price}€`} </p>
          <p>Un email de confirmation vous a été envoyé.</p>
          <p style={{ background: "#fff3cd", padding: "10px", borderRadius: "5px" }}>
            💡 <strong>Astuce :</strong> Si vous ne trouvez pas l'email, vérifiez votre dossier spam
            et marquez-le comme "Non spam"
          </p>
          <Link to="/">Retourner à l'accueil</Link>
        </div>
      ) : (
        <button className="to-paid" disabled={paymentStatus === 1} type="submit">
          {paymentStatus === 1 ? "Paiement en cours..." : "Payer"}
        </button>
      )}
      {paymentStatus === 3 && <p>Une erreur est survenue, veuillez réessayer : </p> && (
        <p>{`Vous n'avez pas pu payer ce montant : ${product_price}€`} </p>
      )}
    </form>
  );
};

export default CheckoutForm;
