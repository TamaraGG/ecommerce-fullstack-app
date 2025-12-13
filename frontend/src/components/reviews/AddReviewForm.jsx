import React, { useState } from "react";
import { addReview } from "../../services/ReviewService";
import useMutation from "../../hooks/useMutation";

function AddReviewForm({ productId, onSuccess }) {
  const [form, setForm] = useState({
    author: "",
    comment: "",
    rating: 1,
  });

  const {
    executeMutation,
    isMutating,
    error: apiError,
  } = useMutation(addReview);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await executeMutation({ ...form, productId });

      setForm({ author: "", comment: "", rating: 1 });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {}
  };

  return (
    <div>
      <h3>Leave a review:</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name: <br />
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <p>Rating:</p>
          {[1, 2, 3, 4, 5].map((number) => (
            <label key={number} style={{ marginRight: "10px" }}>
              {" "}
              <input
                type="radio"
                name="rating"
                value={number}
                checked={number === form.rating}
                onChange={handleChange}
              />
              {number}
            </label>
          ))}
        </div>

        <div>
          <label>
            Comment: <br />
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              rows="4"
              cols="50"
            />
          </label>
        </div>

        {apiError && <div>{apiError}</div>}

        <button type="submit" disabled={isMutating}>
          {isMutating ? "Отправка..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default AddReviewForm;
