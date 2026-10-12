// Custom hook for products
import { useEffect, useState } from "react";

import type { Product } from "@/types";

export function useProducts(filters?: Record<string, string>) {
  const [products] = useState<Product[]>([]);
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    void filters;
  }, [filters]);

  return { products, isLoading, error };
}
