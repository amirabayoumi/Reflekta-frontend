"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { fetchUserData, fetchUserComments, fetchUserStories } from "@/queries";
import type { UserData, StoryComment, Story, AuthContextType } from "@/types";

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

// Use secret from environment variable
const SECRET = process.env.NEXT_PUBLIC_TOKEN_SECRET || "default_secret";

// Simple XOR "encryption" with base64 for reversible encoding (not secure for production)
function xorEncryptDecrypt(input: string, secret: string): string {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    output += String.fromCharCode(
      input.charCodeAt(i) ^ secret.charCodeAt(i % secret.length)
    );
  }
  return output;
}

function encodeToken(token: string): string {
  const xored = xorEncryptDecrypt(token, SECRET);
  return btoa(xored);
}

function decodeToken(encoded: string): string {
  const xored = atob(encoded);
  return xorEncryptDecrypt(xored, SECRET);
}

// Helper functions for cookie management
function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; SameSite=Strict`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userStories, setUserStories] = useState<Story[] | null>(null);
  const [userComments, setUserComments] = useState<StoryComment[] | null>(null);

  // Memoize the refreshUserData function to prevent unnecessary re-renders
  const refreshUserData = useCallback(async () => {
    if (!token) {
      setUser(null);
      setUserStories(null);
      setUserComments(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const userData = await fetchUserData(token);
      setUser(userData);
      if (userData) {
        const userId = userData.id;
        const [stories, comments] = await Promise.all([
          fetchUserStories(userId, token),
          fetchUserComments(userId, token),
        ]);
        setUserStories(stories);
        setUserComments(comments);
      }
    } catch (err) {
      console.error("Failed to refresh user data:", err);
      setError("Failed to load user data");
      setUser(null);
      setUserStories(null);
      setUserComments(null);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Encapsulate token and cookie logic (now with hashing)
  const updateToken = useCallback((newToken: string | null) => {
    setToken(newToken);
    try {
      if (newToken) {
        const encoded = encodeToken(newToken);
        setCookie("auth_token_encoded", encoded);
      } else {
        deleteCookie("auth_token_encoded");
      }
    } catch (e) {
      console.error("Cookie error:", e);
    }
  }, []);

  // Load token from cookie on mount (decode if present)
  useEffect(() => {
    try {
      const encoded = getCookie("auth_token_encoded");
      if (encoded) {
        const decoded = decodeToken(encoded);
        setToken(decoded);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.error("Error accessing cookie:", e);
      setIsLoading(false);
    }
  }, []);

  // Fetch user data whenever token changes
  useEffect(() => {
    if (token) {
      refreshUserData();
    }
  }, [token, refreshUserData]);

  const logout = useCallback(() => {
    setUser(null);
    setUserStories(null);
    setUserComments(null);
    updateToken(null);
  }, [updateToken]);

  // Memoize context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      userStories,
      userComments,
      token,
      isLoading,
      error,
      setToken: updateToken,
      logout,
      refreshUserData,
    }),
    [
      user,
      userStories,
      userComments,
      token,
      isLoading,
      error,
      updateToken,
      logout,
      refreshUserData,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
