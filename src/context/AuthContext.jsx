import {createContext,useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const saved=localStorage.getItem("user");
    if(saved){
      setUser(JSON.parse(saved));
    }
    },[]);
    const login = (username, password) => {
        if (username === "testuser" && password === "Test@123") {
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
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}