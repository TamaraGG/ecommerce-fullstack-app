import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductSmallCard from "./ProductSmallCard";
import PaginationControls from "./controls/PaginationControls";
import SortControls from "./controls/SortControls";
import { useCallback } from "react";
import styles from "../styles/index.module.css";

const SORTING_OPTIONS = ["price", "averageRating", "name", "reviewCount"];

function ProductList({
  fetchProductsFn,
  dependencies = [],
  emptyMessage = "Products not found.",
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort");
  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;

  const fetchData = () => fetchProductsFn(sort, page, size);

  const { data, isLoading, error } = useFetch(fetchData, [
    sort,
    page,
    size,
    ...dependencies,
  ]);

  const handleSortChange = useCallback(
    (newSort) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("sort", newSort);
      newParams.set("page", 1);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const handlePageChange = useCallback(
    (newPage) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", newPage);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const products = data?.content || [];
  const totalPages = data?.page?.totalPages || 1;

  if (error) return <p className={styles.error}>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.sortWrapper}>
        <SortControls
          currentSort={sort}
          onSortChange={handleSortChange}
          sortingOptions={SORTING_OPTIONS}
          className={styles.sortControls}
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        <ul className={styles.cardsGrid}>
          {products.map((product) => (
            <li key={product.id}>
              <ProductSmallCard product={product} />
            </li>
          ))}
        </ul>
      )}

      {!isLoading && products.length > 0 && (
        <div className={styles.paginationWrappere}>
          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default ProductList;
