import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductSmallCard from "./ProductSmallCard";
import PaginationControls from "./controls/PaginationControls";
import SortControls from "./controls/SortControls";

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

  const handleSortChange = (newSort) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", newSort);
    newParams.set("page", 1);
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);
  };

  const products = data?.content || [];
  const totalPages = data?.page?.totalPages || 1;

  if (isLoading) return <p>Загрузка...</p>;
  if (error)
    return (
      <p>ERROR: {error?.message || "FRONTEND: Error while loading products"}</p>
    );
  if (!products.length) return <p>{emptyMessage}</p>;

  return (
    <div>
      <SortControls
        currentSort={sort}
        onSortChange={handleSortChange}
        sortingOptions={SORTING_OPTIONS}
      />

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <ProductSmallCard product={product} />
          </li>
        ))}
      </ul>

      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductList;
