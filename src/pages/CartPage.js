import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../styles/pages/CartPage.css";
import { Trash } from "../assets/svg/Trash";

const CartPage = ({ token }) => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/offer/${id}`);
  };
  return (
    <div className="cart-wrapper" style={{ padding: "20px" }}>
      <div className="cart">
        <h1>Votre Panier</h1>
        {cart.length === 0 ? (
          <p>Le panier est vide</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                className="cart-article-details"
                key={item.id}
                onClick={() => handleClick(item.id)}
                style={{ cursor: "pointer" }}
              >
                {item.name} - {item.price} €
                <button className="remove-product-btn" onClick={() => removeFromCart(item.id)}>
                  <Trash size="1x" />
                </button>
              </div>
            ))}
            <h3>Total : {total.toFixed(2)} €</h3>
            <Link to={token ? "/payment" : "/login"} state={token ? { cart, total } : null}>
              <button className="buy-btn">Acheter</button>
            </Link>
            <Link to="/">
              <button className="continue-shop-btn">Continuer vos achats</button>
            </Link>
            <button className="clear-cart-btn" onClick={clearCart}>
              Vider le panier
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
