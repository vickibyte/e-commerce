/**
 * @license MIT
 * @copyright 2025 Bukola David
 */

import { createContext, useEffect, useState, ReactNode } from "react";
import { getMe } from "../services/authService";

// Type for the context
type user = { name: string; email: string; token: string };

type authContextType = {
    user: user | null;  
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<authContextType>({
    user: null,
    token: null,
    login: () => {},
    logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<user | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    // Load user from localStorage on first render
    useEffect(() => {

        if (token){
            getMe(token)
                .then(response =>                  setUser(response.data))
                    .catch(() => logout());
                
        }
    }, [token]);

   const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};