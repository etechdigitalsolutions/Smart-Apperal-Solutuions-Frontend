// Order service - handles all order-related API calls
import { apiFetch } from "@/lib/api/client";
import type { Order, ApiResponse, PaginatedResponse } from "@/types";

export const orderService = {
  getAll: () => apiFetch<PaginatedResponse<Order>>("/api/orders"),

  getById: (id: string) => apiFetch<ApiResponse<Order>>(`/api/orders/${id}`),

  create: (data: Partial<Order>) =>
    apiFetch<ApiResponse<Order>>("/api/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateStatus: (id: string, status: Order["status"]) =>
    apiFetch<ApiResponse<Order>>(`/api/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};
