import { useSearchParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import { getSortedPaginatedProducts } from "../services/ProductService";
import styles from "../styles/index.module.css";

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
    <div className={styles.container}>
      <h1 className={styles.title}>Category: {category}</h1>
      <ProductList
        fetchProductsFn={fetchCategoryProducts}
        dependencies={[category]}
        emptyMessage="No products in this category."
      />
    </div>
  );
}

export default CategoryPage;
