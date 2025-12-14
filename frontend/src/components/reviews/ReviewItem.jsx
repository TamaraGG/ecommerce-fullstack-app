import styles from "../../styles/index.module.css";

function ReviewItem({ review }) {
  const formatDate = (isoString) => {
    if (!isoString) return "Unknown date";

    return new Date(isoString).toLocaleString("us-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.author}>User: {review.author}</span>
        <span className={styles.rating}>
          Rating: {review.rating.toFixed(2)} / 5.00
        </span>
      </div>
      <div className={styles.content}>
        <p>{review.comment}</p>
      </div>
      <div className={styles.footer}>
        <small className={styles.date}>
          Date: {formatDate(review.createdAt)}
        </small>
      </div>
    </div>
  );
}
export default ReviewItem;
