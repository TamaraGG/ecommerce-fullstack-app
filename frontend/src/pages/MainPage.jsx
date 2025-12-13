import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import useFetch from "../hooks/useFetch";
import { getCategories } from "../services/ProductService";

function MainPage() {
  const fetchData = () => getCategories();

  const { data: categoryList, isLoading, error } = useFetch(fetchData, []);

  return (
    <>
      <h1>Categories:</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>ERROR: {error?.message || "Error while loading."}</p>}

      {!isLoading && !error && categoryList && categoryList.length > 0 && (
        <ul>
          {categoryList.map((cat) => (
            <div key={cat.category}>
              <CategoryCard cat={cat} />
            </div>
          ))}
        </ul>
      )}
      {!isLoading && !error && categoryList && categoryList.length === 0 && (
        <p>No categories.</p>
      )}
    </>
  );
}

export default MainPage;
