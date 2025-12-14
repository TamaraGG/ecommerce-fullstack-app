import { useSearchParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import { getSortedPaginatedProducts } from "../services/ProductService";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const pattern = searchParams.get("pattern") || "";

  const fetchSearchResults = (sort, page, size) => {
    return getSortedPaginatedProducts("/search", "pattern", [
      pattern,
      sort,
      page,
      size,
    ]);
  };

  if (!pattern) return <p>"Enter search request"</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search results: "{pattern}"</h1>
      <ProductList
        fetchProductsFn={fetchSearchResults}
        dependencies={[pattern]}
      />
    </div>
  );
}

export default SearchPage;
