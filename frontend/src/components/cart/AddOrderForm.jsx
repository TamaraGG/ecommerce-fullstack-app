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
    <div className={styles.container}>
      <h3 className={styles.title}>Creating an order:</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Name:
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Full Name"
              required
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="example@mail.com"
              required
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Phone:
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={styles.input}
              placeholder="+1 234 567 8900"
              required
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label>
            Address: <br />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className={styles.input}
              placeholder="Shipping Address"
              required
            />
          </label>
        </div>

        {apiError && <p className={styles.error}>{apiError}</p>}

        <button
          type="submit"
          disabled={isMutating || cartItems.length === 0}
          className={styles.submitButton}
        >
          {isMutating ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default AddOrderForm;
