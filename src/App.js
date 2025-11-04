import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { CartProvider } from "./context/CartContext";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Publish from "./pages/Publish";
import CartPage from "./pages/CartPage";

//component
import Header from "./components/Header";
// import Modal from "./components/Modal";
import Footer from "./components/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [id, setId] = useState(Cookies.get("id-vinted") || null);
  // const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const handleTokenAndId = (token, id) => {
    if (token && id) {
      setToken(token);
      setId(id);
      Cookies.set("token", token, { expires: 14 });
      Cookies.set("id-vinted", id, { expires: 14 });
    } else {
      setToken(null);
      setId(null);
      Cookies.remove("token");
      Cookies.remove("id-vinted");
    }
  };

  return (
    <Router>
      <CartProvider>
        <Header
          search={search}
          id={id}
          token={token}
          handleTokenAndId={handleTokenAndId}
          setSearch={setSearch}
        />
        <Routes>
          <Route path="/" element={<Home search={search} token={token} />} />
          <Route path="/offer/:id" element={<Offer token={token} />} />
          <Route path="/cart" element={<CartPage token={token} />} />

          <Route path="/signup" element={<Signup handleTokenAndId={handleTokenAndId} />} />
          <Route path="/login" element={<Login handleTokenAndId={handleTokenAndId} />} />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route path="/payment" element={<Payment token={token} />} />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
