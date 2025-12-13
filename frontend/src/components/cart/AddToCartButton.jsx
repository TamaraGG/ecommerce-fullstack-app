import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";

function AddToCartButton({ product, quantity = 1 }) {
  const { addToCart, removeFromCart, cartItems } = useCart();

  const existingItem = cartItems.find((item) => item.product.id === product.id);
  const quantityInCart = existingItem ? existingItem.quantity : 0;
  const isAdded = quantityInCart > 0;

  const stockQuantity = product.quantity;

  const handleIncrease = () => {
    if (quantityInCart < stockQuantity) {
      addToCart(product, 1);
    }
  };

  const handleDecrease = () => {
    if (quantityInCart > 0) {
      removeFromCart(product, 1);
    }
  };

  const handleInitialAdd = () => {
    addToCart(product, 1);
  };

  return (
    <>
      {!isAdded ? (
        <button onClick={handleInitialAdd} disabled={stockQuantity === 0}>
          {stockQuantity === 0 ? "not in stock" : "add to cart"}
        </button>
      ) : (
        <div>
          <button onClick={handleDecrease}>-</button>

          <label>{quantityInCart}</label>

          <button
            onClick={handleIncrease}
            disabled={quantityInCart >= stockQuantity}
          >
            +
          </button>

          <Link to="/cart">to the cart</Link>
        </div>
      )}
    </>
  );
}

export default AddToCartButton;
