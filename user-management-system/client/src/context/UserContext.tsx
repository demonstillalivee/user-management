// src/context/UserContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch user profile:", error);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post("/api/login", { email, password });
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await axios.post("/api/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
  };

  const updateProfile = async (data: Partial<User>) => {
    const token = localStorage.getItem("token");
    const response = await axios.put("/api/profile/edit", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(response.data);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, login, logout, register, updateProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
