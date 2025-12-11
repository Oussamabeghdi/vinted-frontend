import { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import { Navigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import "../styles/pages/Payment.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TOKEN);

const Payment = ({ token }) => {
  const { cart } = useContext(CartContext);

  const total = cart?.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const { shippingFees, protectionFees, totalPrice } = useMemo(() => {
    const shipping = total * 0.2;
    const protection = total * 0.1;
    const totalP = total + shipping + protection;
    return {
      shippingFees: shipping.toFixed(2),
      protectionFees: protection.toFixed(2),
      totalPrice: totalP.toFixed(2),
    };
  }, [total]);
  if (!token) return <Navigate to="/login" />;
  if (!cart || cart.length === 0) return <p>Votre panier est vide</p>;

  return (
    <div className="payment-wrapper">
      <div className="payment-content">
        <h1 className="payment-title">Résumé de la commande</h1>

        {cart.map((item) => (
          <div key={item.id}>
            {item.name} - {item.price} €
          </div>
        ))}

        <div className="divider"></div>

        <div className="payment-details-wrapper">
          <div>
            <p>Frais protection acheteurs :</p>
            <p>{protectionFees} €</p>
          </div>
          <div>
            <p>Frais de port :</p>
            <p>{shippingFees} €</p>
          </div>
        </div>

        <div className="payment-total-price-wrapper">
          <p>Total :</p>
          <p>{totalPrice} €</p>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm product_name="Commande Panier" product_price={totalPrice} token={token} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
