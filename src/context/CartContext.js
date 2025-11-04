// import { createContext, useState, useEffect } from "react";

// // Création du contexte
// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(() => {
//     // Récupère le panier depuis localStorage si existant

//   const addToCart = (product) => {
//     setCart((prev) => [...prev, product]);
//   };

//   const removeFromCart = (id) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const clearCart = () => setCart([]);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sauvegarde automatique dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //  Ajouter un produit
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // si le produit existe déjà, on augmente la quantité
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // sinon on l’ajoute avec quantité = 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  //  Retirer 1 quantité
  const decreaseQuantity = (productId) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
          .filter((item) => item.quantity > 0) // supprime si quantité = 0
    );
  };

  //  Supprimer complètement le produit
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  //  Total du panier
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseQuantity, removeFromCart, total, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
