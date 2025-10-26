import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/user";
import { getCurrentUser, loginUser, logoutUser } from "../api/auth";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    console.log(" Refreshing user...");
    try {
      setLoading(true);
      const currentUser = await getCurrentUser(); // This now returns user object directly
      console.log(" User refreshed:", currentUser);
      
      // Make sure we have name and email
      if (currentUser && currentUser.name && currentUser.email) {
        setUser(currentUser);
        console.log(" User set:", {
          name: currentUser.name,
          email: currentUser.email,
          verified: currentUser.isVerified,
          createdAt: currentUser.createdAt
        });
      } else {
        console.warn(" User data incomplete:", currentUser);
        setUser(null);
      }
    } catch (error: any) {
      console.log(" No authenticated user:", error.response?.status);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    console.log("Login attempt for:", email);
    try {
      setLoading(true);
      const response = await loginUser(email, password);
      console.log("Login response:", response);
      
      // Set user from login response immediately
      if (response.success && response.user) {
        setUser(response.user);
        console.log(" User set from login:", {
          name: response.user.name,
          email: response.user.email,
          verified: response.user.isVerified
        });
      } else {
        console.error("Login response missing user data");
      }
    } catch (error: any) {
      console.error("Login failed:", error.response?.data);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log("Logout attempt...");
    try {
      setLoading(true);
      await logoutUser();
      console.log(" Logout successful");
      setUser(null);
      console.log(" User cleared from state");
    } catch (error) {
      console.error(" Logout error:", error);
      // Even if logout fails, clear local state
      setUser(null);
      console.log(" User cleared from state (forced)");
    } finally {
      setLoading(false);
    }
  };

  // Log user state changes
  useEffect(() => {
    if (user) {
      console.log(" User state:", {
        name: user.name || 'NO NAME',
        email: user.email || 'NO EMAIL',
        verified: user.isVerified,
        createdAt: user.createdAt || 'NO DATE'
      });
    } else {
      console.log("User state: null");
    }
  }, [user]);

  useEffect(() => {
    console.log("Initial app load - checking auth status");
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}