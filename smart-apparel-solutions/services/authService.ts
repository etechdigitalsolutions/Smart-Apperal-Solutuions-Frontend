// Auth service - handles authentication API calls
import { apiFetch } from "@/lib/api/client";
import type { User, ApiResponse } from "@/types";

export const authService = {
  login: (credentials: { email: string; password: string }) =>
    apiFetch<ApiResponse<{ user: User; token: string }>>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  register: (data: { name: string; email: string; password: string }) =>
    apiFetch<ApiResponse<{ user: User; token: string }>>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () => apiFetch<ApiResponse<null>>("/api/auth/logout", { method: "POST" }),

  forgotPassword: (email: string) =>
    apiFetch<ApiResponse<null>>("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token: string, password: string) =>
    apiFetch<ApiResponse<null>>("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    }),
};
