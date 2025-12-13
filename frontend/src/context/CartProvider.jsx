import { useState, useEffect } from "react";
import CartContext from "./CartContext";

const getInitialCart = () => {
  const savedCart = localStorage.getItem("Cart");

  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch (e) {
      console.error("Error while parsing localStorage", e);
      return [];
    }
  }
  return [];
};

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getInitialCart);

  const addToCart = function (product, quantity = 1) {
    const existingItemIndex = cartItems.findIndex((item) => {
      return item.product.id === product.id;
    });

    let updatedCartItems;

    if (existingItemIndex > -1) {
      const existingItem = cartItems[existingItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + quantity,
      };

      updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = updatedItem;
    } else {
      const newItem = {
        product: product,
        quantity: quantity,
      };
      updatedCartItems = [...cartItems, newItem];
    }

    setCartItems(updatedCartItems);
  };

  const removeFromCart = function (product, quantity = 1) {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.product.id === product.id
    );

    if (existingItemIndex === -1) {
      return;
    }

    const existingItem = cartItems[existingItemIndex];
    const newQuantity = existingItem.quantity - quantity;

    let updatedCartItems;

    if (newQuantity > 0) {
      const updatedItem = {
        ...existingItem,
        quantity: newQuantity,
      };

      updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = updatedItem;
    } else {
      updatedCartItems = cartItems.filter(
        (item, index) => index !== existingItemIndex
      );
    }
    setCartItems(updatedCartItems);
  };

  const clearCart = function () {
    setCartItems([]);
  };

  const totalItems = cartItems.length;

  const contextValue = {
    cartItems: cartItems,
    totalItems: totalItems,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
  };

  useEffect(() => {
    try {
      localStorage.setItem("Cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Error while saving cart to localStorage", e);
    }
  }, [cartItems]);

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
