import React, { useState } from "react";
import { addReview } from "../../services/ReviewService";
import useMutation from "../../hooks/useMutation";

function AddReviewForm({ productId, onSuccess }) {
  const [form, setForm] = useState({
    author: "",
    comment: "",
    rating: 5,
  });

  const [hover, setHover] = useState(0);

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
    <div className={styles.container}>
      <h3 className={styles.heading}>Leave a review:</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Name:
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              className={styles.input}
              placeholder="Your name"
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <span className={styles.label}>Rating:</span>
          <div className={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((starValue) => {
              const isFilled = starValue <= (hover || form.rating);

              return (
                <label key={starValue} className={styles.starLabel}>
                  <input
                    type="radio"
                    name="rating"
                    value={starValue}
                    onChange={handleChange}
                    className={styles.hiddenRadio}
                  />

                  <span
                    className={isFilled ? styles.starFilled : styles.starEmpty}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Comment: <br />
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              rows="4"
              className={styles.textarea}
              placeholder="Write your comment..."
            />
          </label>
        </div>

        {apiError && <div className={styles.error}>{apiError}</div>}

        <button
          type="submit"
          disabled={isMutating}
          className={styles.submitButton}
        >
          {isMutating ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default AddReviewForm;
