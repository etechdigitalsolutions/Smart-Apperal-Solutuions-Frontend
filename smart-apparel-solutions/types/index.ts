// Application-wide TypeScript types

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  avatar?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  condition: "brand_new" | "used";
  tags: string[];
  brand: string;
  modelCode: string;
  badges: string[];
  specs: Record<string, string>;
  stockStatus: "in_stock" | "out_of_stock" | "pre_order";
  stock: number;
  sku: string;
  createdAt: string;
  installment?: {
    months: number;
    perMonth: number;
    provider: "Koko";
  };
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentSlug?: string;
  children?: Category[];
  image?: string;
  description?: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: Address;
  createdAt: string;
}


export interface TrackingOrder {
  reference: string;
  customerName: string;
  email: string;
  phone: string;
  items: CartItem[];
  subtotal: number;
  promoCode?: string;
  discount: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  delivery: "ship" | "pickup";
  createdAt: string;
  trackingNumber?: string;
  trackingMessage: string;
}



export interface Address {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  tags: string[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
