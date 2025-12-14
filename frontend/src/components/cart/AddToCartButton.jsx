import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
import styles from "../../styles/index.module.css";

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
    <div className={styles.container}>
      {!isAdded ? (
        <button
          onClick={handleInitialAdd}
          disabled={stockQuantity === 0}
          className={styles.mainButton}
        >
          {stockQuantity === 0 ? "not in stock" : "add to cart"}
        </button>
      ) : (
        <div className={styles.controlsContainer}>
          <div className={styles.counterGroup}>
            <button
              onClick={handleDecrease}
              disabled={quantityInCart == 0}
              className={styles.roundButton}
            >
              -
            </button>

            <span className={styles.quantity}>{quantityInCart}</span>

            <button
              onClick={handleIncrease}
              disabled={quantityInCart >= stockQuantity}
              className={styles.roundButton}
            >
              +
            </button>
          </div>

          <Link to="/cart" className={styles.cartLink}>
            To the cart
          </Link>
        </div>
      )}
    </div>
  );
}

export default AddToCartButton;
