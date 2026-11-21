import type { CartItem } from "@/types";

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | {
      type: "ADD_ITEM";
      payload: CartItem;
    }
  | {
      type: "REMOVE_ITEM";
      payload: {
        productId: string;
        size?: string;
        color?: string;
      };
    }
  | {
      type: "UPDATE_QUANTITY";
      payload: {
        productId: string;
        quantity: number;
        size?: string;
        color?: string;
      };
    }
  | {
      type: "CLEAR_CART";
    };

export const initialCartState: CartState = {
  items: [],
};

function isSameCartItem(
  item: CartItem,
  productId: string,
  size?: string,
  color?: string
) {
  return (
    item.productId === productId &&
    item.size === size &&
    item.color === color
  );
}

export function cartReducer(
  state: CartState,
  action: CartAction
): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) =>
        isSameCartItem(
          item,
          action.payload.productId,
          action.payload.size,
          action.payload.color
        )
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            isSameCartItem(
              item,
              action.payload.productId,
              action.payload.size,
              action.payload.color
            )
              ? {
                  ...item,
                  quantity: item.quantity + action.payload.quantity,
                }
              : item
          ),
        };
      }

      return {
        items: [...state.items, action.payload],
      };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (item) =>
            !isSameCartItem(
              item,
              action.payload.productId,
              action.payload.size,
              action.payload.color
            )
        ),
      };

    case "UPDATE_QUANTITY":
      return {
        items: state.items.map((item) =>
          isSameCartItem(
            item,
            action.payload.productId,
            action.payload.size,
            action.payload.color
          )
            ? {
                ...item,
                quantity: action.payload.quantity,
              }
            : item
        ),
      };

    case "CLEAR_CART":
      return initialCartState;

    default:
      return state;
  }
}