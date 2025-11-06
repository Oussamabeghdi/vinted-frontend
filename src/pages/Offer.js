import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/pages/Offer.css";
import { Trash } from "../assets/svg/Trash";

const Offer = ({ token }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, removeFromCart, clearCart, cart, total } = useContext(CartContext);
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const handleAddToCart = () => {
    const product = {
      id: data._id,
      name: data.product_name,
      price: data.product_price,
      image: data.product_image?.secure_url,
    };
    addToCart(product);
  };
  const handleClick = (id) => {
    navigate(`/offer/${id}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:3000/offer/${id}`
          `https://vinted-backend-55n7.onrender.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p style={{ padding: "40px" }}>Loading...</p>
  ) : (
    <article className="order-wrapper">
      <section className="offer-wrapper">
        <img className="offer-image" src={data?.product_image?.secure_url} alt="product" />
        <div className="offer-details-wrapper">
          <p className="offer-price">{data?.product_price} €</p>

          <div className="offer-details-list">
            {data?.product_details.map((detail, index) => {
              const key = Object.keys(detail)[0];

              return (
                <div className="offer-details" key={`detail n°: ${index}`}>
                  <p className="key">{key} :</p>
                  <p className="detail-key"> {detail[key]} </p>
                </div>
              );
            })}
          </div>
          <div className="offer-infos">
            <p className="offer-infos-title">{data?.product_name}</p>
            <p className="offer-infos-description">{data?.product_description}</p>
            <p className="offer-infos-username">{data?.owner.account.username}</p>
          </div>
          <div className="cart-buttons">
            <Link to={token ? "/payment" : "/login"} state={token ? data : null}>
              <button className="buy-button" onClick={() => handleAddToCart()}>
                Acheter
              </button>
            </Link>
            <Link>
              <button className="buy-button" onClick={() => handleAddToCart()}>
                Ajouter au panier
              </button>
            </Link>
            <Link to="/">
              <button className="continue-shopping-btn">Continuer vos achats</button>
            </Link>
          </div>
        </div>
      </section>

      <div className="divider-offerCard-cart"></div>
      <section className="cart-order">
        <div className="order-summary">
          <h2>Liste des produits</h2>
          <div className="products-ordered">
            {cart.map((item) => (
              <div
                className="cart-article-details"
                key={item.id}
                onClick={() => handleClick(item.id)}
              >
                <span>{item.name}</span> <span>{item.price} €</span>
                <div className="remove-product-btn-wrapper">
                  <button
                    className="remove-product-btn-offer-page"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h3>Total : {total.toFixed(2)} €</h3>
          <Link
            className="pay-button"
            to={token ? "/payment" : "/login"}
            state={token ? { cart, total } : null}
          >
            <button className="pay-button">Payer</button>
          </Link>

          <Link className="buy-button" to={token ? "/cart" : "/login"}>
            {/* <button className="buy-button">Acheter</button> */}
            <button className="buy-button">Voir mon panier</button>
          </Link>
          <button className="buy-button" onClick={clearCart}>
            Vider le panier
          </button>
        </div>
      </section>
    </article>
  );
};
export default Offer;
