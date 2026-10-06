// Custom hook for wishlist
import { useState } from "react";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggle = (id: string) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  return { wishlist, toggle };
}
