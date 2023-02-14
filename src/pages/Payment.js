import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const location = useLocation();
  const { title } = location.state;
  const { price } = location.state;
  const stripePromise = loadStripe(
    "pk_test_51IpvphDqQKb3lCIT3UU1fIPnAXyyG57gLns831kNwLVGCFo1a3MtSucuiIwEijgip8fL85zUlKZKTK0a2JAhSWHt00ZWSjTErF"
  );

  return (
    <div className="payment-container">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <span>Il ne vous reste plus qu'une étape pour vous offrir {title} .</span>
      <span> Vous allez payer {price} €</span>
    </div>
  );
};

export default Payment;
