/**
 * @license MIT
 * @copyright 2025 Bukola David
 */
import { createContext, useEffect, useState, useContext, ReactNode } from "react";
import axios from "axios";
import { getMe } from "../lib/api";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: "user" | "admin"; // ✅ strongly typed
};

type ApiUser = {
  id?: string;
  _id?: string;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  role: string;
};

type LoginPayload = ApiUser | { user: ApiUser };

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (payload: LoginPayload, token: string) => Promise<void>;
  logout: () => void;
  setError: (error: string | null) => void;
  isAdmin: boolean; // ✅ new helper
};

const defaultValue: AuthContextType = {
  user: null,
  token: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: () => {},
  setError: () => {},
  isAdmin: false,
};

export const AuthContext = createContext<AuthContextType>(defaultValue);

function mapToUser(raw: any): User {
  return {
    id: raw.id ?? raw._id ?? "",
    firstName: raw.firstName ?? "",
    lastName: raw.lastName ?? "",
    username: raw.username,
    email: raw.email,
    role: raw.role ?? "user",
  };
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Keep axios Authorization header in sync
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Restore session
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      try {
        const parsed = JSON.parse(savedUser) as User;
        setUser(parsed);
        setToken(savedToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
        return;
      } catch (err) {
        console.error("Failed to parse saved user from localStorage", err);
        logout();
      }
    }

    if (token) {
      setLoading(true);
      getMe()
        .then((response) => {
          const u: ApiUser = response.data?.user ?? response.data;
          const mapped = mapToUser(u);
          setUser(mapped);
          localStorage.setItem("user", JSON.stringify(mapped));
        })
        .catch((err) => {
          console.error("Failed to fetch user data", err);
          logout();
        })
        .finally(() => setLoading(false));
    }
  }, [token]);

  const login = async (payload: LoginPayload, newToken: string): Promise<void> => {
    try {
      const raw: ApiUser = "user" in payload ? payload.user : payload;
      const mapped = mapToUser(raw);

      setUser(mapped);
      setToken(newToken);
      setLoading(false);
      setError(null);

      if (typeof window !== "undefined") {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(mapped));
        localStorage.setItem("userId", mapped.id);
        window.dispatchEvent(new Event("login"));
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    } catch (err) {
      setError(`Login failed: ${err instanceof Error ? err.message : "Unknown error"}`);
      throw err;
    }
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cartItems");
      window.dispatchEvent(new Event("logout"));
    }
    delete axios.defaults.headers.common["Authorization"];
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, logout, setError, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
