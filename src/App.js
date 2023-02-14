import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
//component
import Header from "./components/Header";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import Publish from "./pages/Publish";

const stripePromise = loadStripe(
  "pk_test_51IpvphDqQKb3lCIT3UU1fIPnAXyyG57gLns831kNwLVGCFo1a3MtSucuiIwEijgip8fL85zUlKZKTK0a2JAhSWHt00ZWSjTErF"
);

function App() {
  // State dans lequel je stock la valeur de token sa valeur de base sera :
  // Si je trouve un cookie token, alors ce cookie sinon , null

  const [token, setToken] = useState(Cookies.get("token-vinted") || null);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  // Cette fonction stockera le token dans le state et dans les cookies ou supprimer le token dans le state et dans les cookies
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token-vinted", token, { expires: 14 });
    } else {
      setToken(null);
      Cookies.remove("token-vinted");
    }
  };

  return (
    <Router>
      <Header
        search={search}
        token={token}
        handleToken={handleToken}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
      </Routes>
      <Footer visible={visible} setVisible={setVisible} />
      {visible && <Modal setVisible={setVisible} />}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </Router>
  );
}

export default App;
