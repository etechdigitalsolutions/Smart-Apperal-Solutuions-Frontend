// Cart store - global cart state using React Context / useReducer pattern
// Replace with Zustand or Redux Toolkit if preferred

export type CartAction =
  | { type: "ADD_ITEM"; payload: any }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

export interface CartState {
  items: any[];
  total: number;
}

export const initialCartState: CartState = {
  items: [],
  total: 0,
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload.id) };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    case "CLEAR_CART":
      return initialCartState;
    default:
      return state;
  }
}
