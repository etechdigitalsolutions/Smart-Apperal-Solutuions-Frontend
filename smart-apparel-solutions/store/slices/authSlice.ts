// Auth store - global auth state

import type { User } from "@/types";

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export type AuthAction =
  | { type: "LOGIN"; payload: { user: User; token: string } }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: User };

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload.user, token: action.payload.token, isAuthenticated: true };
    case "LOGOUT":
      return initialAuthState;
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
