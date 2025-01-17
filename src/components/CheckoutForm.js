import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const CheckoutForm = ({ product_name, product_price }) => {
  const [paymentStatus, setPaymentStatus] = useState(0); // 0 = pas encore cliqué / 1 = en attente de réponse / 2 = OK / 3 = Error

  // const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const userId = Cookies.get("id-vinted");
  console.log(userId + "coucou");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setPaymentStatus(1);
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: userId,
      });
      const stripeToken = stripeResponse.token.id;

      // console.log(stripeToken);
      const response = await axios.post(
        // "http://localhost:3000/payment",
        "https://site--vinted-backend--9gtnl5qyn2yw.code.run/payment",
        {
          stripeToken: stripeToken,
          // le token que je recois  de l'API Stripe
          title: product_name,
          amount: product_price * 100,
          // le prix indiquée dans l'annonce
        }
      );

      // console.log(response.data);
      if (response.data.status === "succeeded") {
        setPaymentStatus(2);
      }
    } catch (error) {
      setPaymentStatus(3);
      console.log(error.message);
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
      <CardElement />

      {paymentStatus === 2 ? (
        <div>
          <p>Paiement effectué</p>
          <p>{`Vous avez été débité de ${product_price}€`} </p>
        </div>
      ) : (
        <button className="to-paid" disabled={paymentStatus === 1} type="submit">
          Payer
        </button>
      )}
      {paymentStatus === 3 && <p>Une erreur est survenue, veuillez réessayer : </p> && (
        <p>{`Vous n'avez pas pu payer ce montant : ${product_price}€`} </p>
      )}
    </form>
  );
};

export default CheckoutForm;
