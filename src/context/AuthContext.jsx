import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const saved = localStorage.getItem("user");

    if (saved) {
      setUser(JSON.parse(saved));
    }

    setLoading(false);

  }, []);

  const login = (username, password) => {

    if (username === "testuser" && password === "Test123") {

      const data = { username };

      setUser(data);

      localStorage.setItem("user", JSON.stringify(data));

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};