"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { fetchUserData } from "@/queries";
import type { UserData } from "@/types";

// Define the shape of your auth context
export interface AuthContextType {
  user: UserData | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  error: null,
  setToken: () => {},
  logout: () => {},
  refreshUserData: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the refreshUserData function to prevent unnecessary re-renders
  const refreshUserData = useCallback(async () => {
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const userData = await fetchUserData(token);
      setUser(userData);
    } catch (err) {
      console.error("Failed to refresh user data:", err);
      setError("Failed to load user data");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [token]); // Only depend on token

  // Load token from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("auth_token");
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (e) {
      console.error("Error accessing localStorage:", e);
    } finally {
      if (!token) {
        setIsLoading(false); // Ensure we're not loading forever if no token
      }
    }
  }, []); // Empty dependency array since this should only run on mount

  // Fetch user data whenever token changes
  useEffect(() => {
    if (token) {
      refreshUserData();
      try {
        localStorage.setItem("auth_token", token);
      } catch (e) {
        console.error("Error saving to localStorage:", e);
      }
    }
  }, [token, refreshUserData]); // Include refreshUserData in dependencies

  const logout = () => {
    setUser(null);
    setToken(null);
    // Clear from localStorage too
    try {
      localStorage.removeItem("auth_token");
    } catch (e) {
      console.error("Error removing from localStorage:", e);
    }
    // Also clear the cookie if you're using one
    document.cookie =
      "token=; Max-Age=0; path=/; domain=" + window.location.hostname;
  };

  // Load user data on initial mount
  useEffect(() => {
    refreshUserData();
  }, []);

  const value = {
    user,
    token,
    isLoading,
    error,
    setToken,
    logout,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
