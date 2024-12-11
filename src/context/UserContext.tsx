import React, { createContext, useState, useContext, useEffect } from "react";

interface UserContextType {
  user: { id: string; name: string; isAdmin: boolean } | null;
  isAuthenticated: boolean;
  setUser: (
    user: { id: string; name: string; isAdmin: boolean } | null
  ) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    isAdmin: boolean;
  } | null>(JSON.parse(localStorage.getItem("user") || "null"));

  const isAuthenticated = !!user;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Token invalid");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Token validation error:", error);
        logout();
      }
    };

    validateToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, isAuthenticated, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
