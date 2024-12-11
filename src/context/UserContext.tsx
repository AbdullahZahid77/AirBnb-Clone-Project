import React, { createContext, useState, useContext, useEffect } from "react";

interface UserContextType {
  user: { id: string; name: string; isAdmin: boolean } | null;
  isAuthenticated: boolean;
  token: string | null;
  setUser: (
    user: { id: string; name: string; isAdmin: boolean } | null
  ) => void;
  logout: () => void;
  setTokenLocal: (token: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    isAdmin: boolean;
  } | null>(JSON.parse(localStorage.getItem("user") || "null"));
  const [token, setToken] = useState<string | null>("");

  const isAuthenticated = !!user;
  const setTokenLocal = (token: any) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const validateToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/validate", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Token invalid");

      const data = await response.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Token validation error:", error);
      logout();
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, token, setUser, logout, setTokenLocal }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
