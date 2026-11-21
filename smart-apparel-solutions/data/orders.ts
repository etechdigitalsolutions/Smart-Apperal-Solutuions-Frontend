
import type { TrackingOrder } from "@/types";

const ORDERS_KEY = "sas_orders";

export function getOrders(): TrackingOrder[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(ORDERS_KEY);
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as TrackingOrder[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: TrackingOrder): void {
  const orders = getOrders();

  localStorage.setItem(
    ORDERS_KEY,
    JSON.stringify([...orders, order])
  );
}

export function createOrderReference(): string {
  return `SAS-${Date.now().toString().slice(-6)}`;
}

export function findOrder(
  reference: string,
  phone: string
): TrackingOrder | undefined {
  return getOrders().find(
    (order) =>
      order.reference.toLowerCase() === reference.trim().toLowerCase() &&
      order.phone.replace(/\D/g, "") === phone.replace(/\D/g, "")
  );
}
