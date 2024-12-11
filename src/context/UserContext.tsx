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
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const isAuthenticated = !!user;

  const setTokenLocal = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  const validateToken = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      logout();
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: storedToken }),
      });

      if (!response.ok) throw new Error("Token validation failed");

      const data = await response.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
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
