import React from "react";

const CartContext = React.createContext({
  cartItems: [],
  totalItems: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export default CartContext;
