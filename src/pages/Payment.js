import { Navigate, useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "../components/CheckoutForm";

const Payment = ({ token }) => {
  const location = useLocation();
  const { product_name, product_price } = location.state;
  const stripePromise = loadStripe(
    "pk_test_51MbOiLFHbYk9rQIzahkFtNt1wjSBlxKBaIYuVITyFW5wtO1F1oLSgc88Yh8prr1fpltbL6YLDnQlX37B2NvWGVfi00eqnMbFqr"
  );

  return token ? (
    <div className="payment-container">
      <h1>Résumé de la commande</h1>
      <p>Prix de la commande : {product_price} €</p>
      <p>Vous allez acheter : {product_name}</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          product_name={product_name}
          product_price={product_price}
        />
      </Elements>
      <span>
        Il ne vous reste plus qu'une étape pour vous offrir {product_name} .
      </span>
      <span> Vous allez payer {product_price} €</span>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
