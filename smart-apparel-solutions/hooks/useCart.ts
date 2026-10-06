// Custom hook for cart state management
import { useState } from "react";

export function useCart() {
  const [cart, setCart] = useState<any[]>([]);

  const addItem = (item: any) => setCart((prev) => [...prev, item]);
  const removeItem = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  return { cart, addItem, removeItem, clearCart };
}
