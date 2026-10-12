// Custom hook for auth state
import { useState } from "react";

import type { User } from "@/types";

type LoginCredentials = {
  email: string;
  password: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: LoginCredentials) => {
    void credentials;
    setIsLoading(true);
    // TODO: implement login
    setIsLoading(false);
  };

  const logout = () => setUser(null);

  return { user, isLoading, login, logout };
}
