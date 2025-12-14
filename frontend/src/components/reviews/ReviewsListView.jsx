import ReviewItem from "./ReviewItem";

function ReviewsListView({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p>There are now reviews.</p>;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.reviewsList}>
        {reviews.map((review) => (
          <li key={review.id}>
            <ReviewItem review={review} />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ReviewsListView;
