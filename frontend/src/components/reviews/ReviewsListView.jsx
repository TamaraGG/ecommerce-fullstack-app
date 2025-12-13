import ReviewItem from "./ReviewItem";

function ReviewsListView({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p>There are now reviews.</p>;
  }

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <ReviewItem review={review} />
        </li>
      ))}
    </ul>
  );
}
export default ReviewsListView;
