import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getProductReviews } from "../../services/ReviewService";
import PaginationControls from "../controls/PaginationControls";
import ReviewsListView from "./ReviewsListView";
import SortControls from "../controls/SortControls";
import AddReviewForm from "./AddReviewForm";

const SORTING_OPTIONS = ["rating", "date", "author", "comment"];

function ReviewsList({ productId }) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(SORTING_OPTIONS[0].value);
  const size = 5;

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchData = () => getProductReviews(productId, sort, page, size);

  const { data, isLoading, error } = useFetch(fetchData, [
    productId,
    sort,
    page,
    size,
    refreshTrigger,
  ]);

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleReviewAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
    setPage(1);
  };

  const reviews = data?.content || [];
  const totalPages = data?.page?.totalPages || 1;

  return (
    <div>
      <AddReviewForm productId={productId} onSuccess={handleReviewAdded} />
      <h3>Reviews:</h3>
      <SortControls
        currentSort={sort}
        onSortChange={handleSortChange}
        sortingOptions={SORTING_OPTIONS}
      />
      {isLoading && <p>Loading reviews...</p>}
      {error && <p>ERROR: {error.message}</p>}

      {!isLoading && !error && (
        <>
          <ReviewsListView reviews={reviews} />
          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
export default ReviewsList;
