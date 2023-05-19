import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const CheckoutForm = ({ product_name, product_price }) => {
  const [paymentStatus, setPaymentStatus] = useState(0); // 0 = pas encore cliqué / 1 = en attente de réponse / 2 = OK / 3 = Error

  const stripe = useStripe();
  const elements = useElements();

  const userId = Cookies.get("id-vinted");
  console.log(userId);

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
        "http://localhost:3000/payment",
        // "https://lereacteur-vinted-api.herokuapp.com/payment",
        // "https://site--vinted-backend--9gtnl5qyn2yw.code.run/payment",
        {
          stripeToken: stripeToken,
          // le token que vous avez reçu de l'API Stripe
          title: product_name,
          amount: product_price,
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
        <p>Paiement effectué</p>
      ) : (
        <button
          className="to-paid"
          disabled={paymentStatus === 1}
          type="submit"
        >
          Payer
        </button>
      )}
      {paymentStatus === 3 && (
        <p>Une erreur est survenue, veuillez réessayer : </p>
      )}
    </form>
  );
};

export default CheckoutForm;
