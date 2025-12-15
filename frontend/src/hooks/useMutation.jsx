// src/hooks/useMutation.js
import { useState } from "react";

function useMutation(mutationFunction) {
  const [data, setData] = useState(null);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState(null);

  const executeMutation = async (...args) => {
    setIsMutating(true);
    setError(null);
    setData(null);

    try {
      const result = await mutationFunction(...args);
      setData(result);
      return result;
    } catch (e) {
      setError(e.message || "FRONTEND: Request error.");
      throw e;
    } finally {
      setIsMutating(false);
    }
  };

  return {
    executeMutation,
    data,
    isMutating,
    error,
  };
}

export default useMutation;
