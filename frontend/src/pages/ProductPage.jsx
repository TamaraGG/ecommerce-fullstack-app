import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/ProductService";
import ReviewsList from "../components/reviews/ReviewList";
import styles from "../styles/index.module.css";

function ProductPage() {
  const { id } = useParams();

  const fetchData = () => getProducts(id);

  const { data: product, isLoading, error } = useFetch(fetchData, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.productSection}>
        {isLoading && (
          <p className={styles.message}>Loading product details...</p>
        )}
        {error && (
          <p className={styles.error}>
            ERROR: {error?.message || "Error while loading."}
          </p>
        )}

        {!isLoading && !error && product && <ProductCard product={product} />}

        {!isLoading && !error && !product && (
          <p className={styles.message}>Product not found.</p>
        )}
      </div>
      <div className={styles.reviewsSection}>
        <ReviewsList productId={id} />
      </div>
    </div>
  );
}

export default ProductPage;
