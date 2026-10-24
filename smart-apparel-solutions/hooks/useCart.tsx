"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

import type { CartItem } from "@/types";
import {
  cartReducer,
  initialCartState,
} from "@/store/slices/cartSlice";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;

  addItem: (item: CartItem) => void;
  removeItem: (
    productId: string,
    size?: string,
    color?: string
  ) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    size?: string,
    color?: string
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialCartState
  );

  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage after the component mounts.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      if (savedCart) {
        const items = JSON.parse(savedCart) as CartItem[];

        if (Array.isArray(items)) {
          items.forEach((item) => {
            dispatch({
              type: "ADD_ITEM",
              payload: item,
            });
          });
        }
      }
    } catch {
      // Ignore invalid localStorage data.
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save cart after hydration.
  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(state.items)
    );
  }, [state.items, isHydrated]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    const subtotal = state.items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    );

    return {
      items: state.items,
      itemCount,
      subtotal,

      addItem: (item) => {
        if (
          !Number.isInteger(item.quantity) ||
          item.quantity < 1
        ) {
          return;
        }

        dispatch({
          type: "ADD_ITEM",
          payload: item,
        });
      },

      removeItem: (productId, size, color) => {
        dispatch({
          type: "REMOVE_ITEM",
          payload: {
            productId,
            size,
            color,
          },
        });
      },

      updateQuantity: (
        productId,
        quantity,
        size,
        color
      ) => {
        if (
          !Number.isInteger(quantity) ||
          quantity < 1
        ) {
          return;
        }

        dispatch({
          type: "UPDATE_QUANTITY",
          payload: {
            productId,
            quantity,
            size,
            color,
          },
        });
      },

      clearCart: () => {
        dispatch({
          type: "CLEAR_CART",
        });
      },
    };
  }, [state.items]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside a CartProvider"
    );
  }

  return context;
}