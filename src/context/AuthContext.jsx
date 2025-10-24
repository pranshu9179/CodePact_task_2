import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage once
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  // ✅ login(email, password) returns success & role
  const login = (email, password) => {
    const registered = JSON.parse(localStorage.getItem("registeredUser"));
    if (!registered) {
      return { success: false, message: "No registered user found" };
    }

    if (registered.email === email && registered.password === password) {
      setUser(registered);
      localStorage.setItem("user", JSON.stringify(registered));
      return { success: true, role: registered.role };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
