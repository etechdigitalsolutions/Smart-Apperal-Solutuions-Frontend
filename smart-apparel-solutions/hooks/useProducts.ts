// Custom hook for products
import { useState, useEffect } from "react";

export function useProducts(filters?: Record<string, string>) {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: fetch products
  }, []);

  return { products, isLoading, error };
}
