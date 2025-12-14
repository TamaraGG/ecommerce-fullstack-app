import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getProductReviews } from "../../services/ReviewService";
import PaginationControls from "../controls/PaginationControls";
import ReviewsListView from "./ReviewsListView";
import SortControls from "../controls/SortControls";
import AddReviewForm from "./AddReviewForm";
import styles from "../../styles/index.module.css";

const SORTING_OPTIONS = ["rating", "createdAt", "author", "comment"];

function ReviewsList({ productId }) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(SORTING_OPTIONS[0]);
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
    <div className={styles.container}>
      <div className={styles.addSection}>
        <AddReviewForm productId={productId} onSuccess={handleReviewAdded} />
      </div>

      <div className={styles.listSection}>
        <div className={styles.header}>
          <h3 className={styles.title}>Reviews:</h3>
          <div className={styles.sortWrapper}>
            <SortControls
              currentSort={sort}
              onSortChange={handleSortChange}
              sortingOptions={SORTING_OPTIONS}
            />
          </div>
        </div>
      </div>

      {isLoading && <p className={styles.message}>Loading reviews...</p>}
      {error && <p className={styles.error}>ERROR: {error.message}</p>}

      {!isLoading && !error && (
        <div className={styles.list}>
          <ReviewsListView reviews={reviews} />
        </div>
      )}
      <div className={styles.pagination}>
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
export default ReviewsList;
