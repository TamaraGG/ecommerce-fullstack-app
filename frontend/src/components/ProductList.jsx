import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductSmallCard from "./ProductSmallCard";
import PaginationControls from "./controls/PaginationControls";
import SortControls from "./controls/SortControls";
import { useCallback } from "react";

const SORTING_OPTIONS = ["price", "rating", "name", "reviews"];

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

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <SortControls
        currentSort={sort}
        onSortChange={handleSortChange}
        sortingOptions={SORTING_OPTIONS}
      />

      {isLoading ? (
        <p>Загрузка...</p>
      ) : products.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <ProductSmallCard product={product} />
            </li>
          ))}
        </ul>
      )}

      {!isLoading && products.length > 0 && (
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default ProductList;
