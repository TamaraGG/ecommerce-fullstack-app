import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";

function CartButton() {
  const { totalItems } = useCart();

  return (
    <>
      <Link to="/cart">Cart ({totalItems})</Link>
    </>
  );
}

export default CartButton;
