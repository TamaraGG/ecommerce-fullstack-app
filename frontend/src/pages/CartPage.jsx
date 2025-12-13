import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import ProductList from "../components/ProductList";
import AddOrderForm from "../components/cart/AddOrderForm";

function CartPage() {
  const { cartItems, totalItems } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const fetchCartData = useCallback(
    async (sort, page, size) => {
      let products = cartItems.map((item) => item.product);

      const [sortField, sortDir] = sort ? sort.split(",") : ["price", "asc"];

      products.sort((a, b) => {
        const valueA = a[sortField];
        const valueB = b[sortField];

        if (valueA === undefined || valueB === undefined) return 0;

        let comparison = 0;

        if (typeof valueA === "string") {
          comparison = valueA.localeCompare(valueB);
        } else {
          comparison = valueA - valueB;
        }

        return sortDir === "desc" ? -comparison : comparison;
      });

      const totalPages = Math.ceil(products.length / size);
      const startIndex = (page - 1) * size;
      const endIndex = startIndex + size;
      const paginatedProducts = products.slice(startIndex, endIndex);

      return {
        content: paginatedProducts,
        page: {
          totalPages: totalPages,
        },
      };
    },
    [cartItems]
  );

  if (totalItems === 0) {
    return (
      <div>
        <h2>Cart is empty</h2>
        <Link to="/">Go to main page</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Cart</h2>

      <h3>Total price: {totalPrice.toFixed(2)} $</h3>

      <ProductList
        fetchProductsFn={fetchCartData}
        dependencies={[cartItems]}
        emptyMessage="Cart is empty."
      />
      <AddOrderForm />
    </div>
  );
}

export default CartPage;
