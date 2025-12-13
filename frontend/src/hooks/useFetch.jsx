import { useState, useEffect } from "react";

function useFetch(fetchFunction, dependencies) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    async function getData() {
      try {
        const result = await fetchFunction();
        if (isMounted) setData(result);
      } catch (e) {
        if (isMounted) setError(e.message || "FRONTEND: Request error.");
        throw e;
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    getData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, isLoading, error };
}

export default useFetch;
