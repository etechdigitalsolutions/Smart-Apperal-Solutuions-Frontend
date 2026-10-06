// Product service - handles all product-related API calls
import { apiFetch } from "@/lib/api/client";
import type { Product, PaginatedResponse } from "@/types";

export const productService = {
  getAll: (params?: Record<string, string>) =>
    apiFetch<PaginatedResponse<Product>>(`/api/products?${new URLSearchParams(params)}`),

  getBySlug: (slug: string) =>
    apiFetch<{ data: Product }>(`/api/products/${slug}`),

  create: (data: Partial<Product>) =>
    apiFetch<{ data: Product }>("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<Product>) =>
    apiFetch<{ data: Product }>(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiFetch<{ success: boolean }>(`/api/products/${id}`, { method: "DELETE" }),
};
