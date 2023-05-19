import { Navigate, useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/pages/Payment.css";

import CheckoutForm from "../components/CheckoutForm";
import { useMemo } from "react";

const Payment = ({ token }) => {
  const location = useLocation();

  const { product_name, product_price } = location.state;

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TOKEN);

  const { shippingFees, protectionFees, totalPrice } = useMemo(() => {
    const productPriceToFLoat = parseFloat(product_price);
    const shippingFees = productPriceToFLoat * 0.2;
    const protectionFees = productPriceToFLoat * 0.1;
    const totalPrice = productPriceToFLoat + shippingFees + protectionFees;

    return {
      shippingFees: shippingFees.toFixed(2),
      protectionFees: protectionFees.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    };
  }, [product_price]);

  return token ? (
    <div className="payment-wrapper">
      <div className="payment-content">
        <h1 className="payment-title">Résumé de la commande</h1>
        <div className="payment-details-wrapper">
          <div>
            <p>Commande</p>
            <p>{product_price} €</p>
          </div>
          <div>
            <p>Frais protection acheteurs</p>
            <p>{protectionFees} €</p>
          </div>
          <div>
            <p>Frais de port</p>
            <p>{shippingFees} €</p>
          </div>
        </div>
        <div className="divider"></div>
        <div className="payment-total-price-wrapper">
          <p>Total</p>
          <p>{totalPrice} €</p>
        </div>
        <div className="payment-step">
          Il ne vous reste plus qu'une étape pour vous offrir
          <span className="payment-bold"> {product_name} </span>. Vous allez
          payer
          <span className="payment-bold"> {totalPrice} € </span> (frais de
          protection et frais de port inclus).
        </div>
        <div className="divider"></div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            product_name={product_name}
            product_price={product_price}
          />
        </Elements>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
