/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import { createContext, useEffect, useState, useContext, ReactNode } from "react";
import { getMe } from "../lib/api";

// Type for the context
type User = { name: string; email: string; role: string; token?: string };

type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    // Load user when token changes
    useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
    } else if (token) {
        getMe()
            .then((response) => setUser(response.data))
            .catch(() => logout());
    }
}, []);

  const login = (userData: User, newToken: string) => {
    setUser(userData);
    setToken(newToken);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
};

   const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);