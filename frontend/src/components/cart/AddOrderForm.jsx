import React, { useState } from "react";
import { addOrder } from "../../services/OrderService";
import useMutation from "../../hooks/useMutation";
import { useCart } from "../../hooks/useCart";

function AddOrderForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { cartItems, clearCart } = useCart();

  const {
    executeMutation,
    isMutating,
    error: apiError,
  } = useMutation(addOrder);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderPayload = {
      customer: {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/\D/g, ""),
        address: form.address.trim(),
      },
      items: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    try {
      await executeMutation(orderPayload);
    } catch (apiError) {
      console.error("FRONTEND: API Error. Order not created.", apiError);
      return;
    }
    try {
      setForm({ name: "", email: "", phone: "", address: "" });

      if (clearCart) {
        clearCart();
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (uiError) {
      console.error(
        "FRONTEND: Order succeeded, but UI failed to update.",
        uiError
      );
    }
  };

  return (
    <div>
      <h3>Creating an order:</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <br />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Email: <br />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Phone: <br />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Address: <br />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </label>
        </div>

        {apiError && <div>{apiError}</div>}

        <button type="submit" disabled={isMutating || cartItems.length === 0}>
          {isMutating ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddOrderForm;
