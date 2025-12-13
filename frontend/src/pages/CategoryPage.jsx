import { useSearchParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import { getSortedPaginatedProducts } from "../services/ProductService";

function CategoryPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const fetchCategoryProducts = (sort, page, size) => {
    return getSortedPaginatedProducts("", "category", [
      category,
      sort,
      page,
      size,
    ]);
  };

  return (
    <div>
      <h2>Category: {category}</h2>
      <ProductList
        fetchProductsFn={fetchCategoryProducts}
        dependencies={[category]}
        emptyMessage="No products in this category."
      />
    </div>
  );
}

export default CategoryPage;
