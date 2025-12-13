function ReviewItem({ review }) {
  return (
    <div>
      <div>
        <h3>user: {review.author}</h3>
        <h3>Rating: {review.rating.toFixed(2)} / 5.00</h3>
      </div>
      <p>{review.comment}</p>
      <p>Date: {review.createdAt}</p>
    </div>
  );
}
export default ReviewItem;
