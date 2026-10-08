"use client";

import type { CartItem as CartItemType } from "@/types";
import { useCart } from "@/hooks/useCart";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const subtotal = item.product.price * item.quantity;

  const handleDecrease = () => {
    if (item.quantity <= 1) {
      return;
    }

    updateQuantity(
      item.productId,
      item.quantity - 1,
      item.size,
      item.color
    );
  };

  const handleIncrease = () => {
    if (item.quantity >= item.product.stock) {
      return;
    }

    updateQuantity(
      item.productId,
      item.quantity + 1,
      item.size,
      item.color
    );
  };

  return (
    <article>
      <div>
        <strong>{item.product.name}</strong>

        {item.size && <p>Size: {item.size}</p>}
        {item.color && <p>Color: {item.color}</p>}

        <p>Rs. {item.product.price.toFixed(2)}</p>
      </div>

      <div>
        <button
          type="button"
          onClick={handleDecrease}
          disabled={item.quantity <= 1}
          aria-label={`Decrease quantity of ${item.product.name}`}
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button
          type="button"
          onClick={handleIncrease}
          disabled={item.quantity >= item.product.stock}
          aria-label={`Increase quantity of ${item.product.name}`}
        >
          +
        </button>
      </div>

      <strong>Rs. {subtotal.toFixed(2)}</strong>

      <button
        type="button"
        onClick={() =>
          removeItem(item.productId, item.size, item.color)
        }
      >
        Remove
      </button>
    </article>
  );
}