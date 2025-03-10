import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

// Define user interface
export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Persist user in localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call to your backend
      // Simulating a network request
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock validation - in a real app this would be handled by the server
      if (!email || !password) {
        toast.error("Please enter both email and password");
        return false;
      }

      // For demo purposes, we'll use a stored user if it exists, otherwise accept any credentials
      const storedUsers = localStorage.getItem("registeredUsers");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const foundUser = users.find((u: any) => u.email === email);

        if (!foundUser) {
          toast.error("User not found. Please check your email or sign up.");
          return false;
        }

        if (foundUser.password !== password) {
          toast.error("Invalid password. Please try again.");
          return false;
        }

        const authenticatedUser: User = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
        };

        setUser(authenticatedUser);
        toast.success(`Welcome back, ${foundUser.name}!`);
        return true;
      } else {
        // For demo without registration, accept any login
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          name: email.split("@")[0],
        };
        setUser(mockUser);
        toast.success("Login successful!");
        return true;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to log in. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call to your backend
      // Simulating a network request
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Validation - in a real app this would be handled by the server
      if (!name || !email || !password) {
        toast.error("Please fill in all fields");
        return false;
      }

      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
      }

      // Check if user already exists
      const storedUsers = localStorage.getItem("registeredUsers");
      let users = [];

      if (storedUsers) {
        users = JSON.parse(storedUsers);
        if (users.some((u: any) => u.email === email)) {
          toast.error("User with this email already exists");
          return false;
        }
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        created: new Date().toISOString(),
      };

      // Store in "database" (localStorage)
      users.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(users));

      // Log user in
      const authenticatedUser: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      };

      setUser(authenticatedUser);
      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to create account. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("You have been logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
