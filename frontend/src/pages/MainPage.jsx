import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import useFetch from "../hooks/useFetch";
import { getCategories } from "../services/ProductService";

function MainPage() {
  const fetchData = () => getCategories();

  const { data: categoryList, isLoading, error } = useFetch(fetchData, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Categories</h1>
      <div className={styles.list}>
        {isLoading && <p className={styles.message}>Loading...</p>}
        {error && (
          <p className={styles.error}>
            ERROR: {error?.message || "Error while loading."}
          </p>
        )}

        {!isLoading && !error && categoryList && categoryList.length > 0 && (
          <ul className={styles.cardsGrid}>
            {categoryList.map((cat) => (
              <li key={cat.category}>
                <CategoryCard cat={cat} />
              </li>
            ))}
          </ul>
        )}
        {!isLoading && !error && categoryList && categoryList.length === 0 && (
          <p className={styles.message}>No categories.</p>
        )}
      </div>
    </div>
  );
}

export default MainPage;
