// App-wide constants

export const APP_NAME = "Smart Apparel Solutions";
export const APP_DESCRIPTION =
  "Industrial sewing, cutting & finishing machines, spare parts and accessories in Sri Lanka";

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  CART: "/cart",
  CHECKOUT: "/checkout",
  BLOG: "/blog",
  ABOUT: "/about",
  CONTACT: "/contact",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  ADMIN: "/admin/dashboard",
  MAHAMU: "/mahamu",
  INSTALLMENTS: "/installments",
  SERVICES_REPAIR: "/services-repair",
  TRACK_ORDER: "/track-order",
} as const;

export const ORDER_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Selling", value: "best-selling" },
] as const;

export const ITEMS_PER_PAGE = 12;
