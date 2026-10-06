// Custom hook for auth state
import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    // TODO: implement login
    setIsLoading(false);
  };

  const logout = () => setUser(null);

  return { user, isLoading, login, logout };
}
