import React, { createContext, useContext, useState } from "react";
import { login as apiLogin, signup as apiSignup } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await apiLogin({ email, password });
      setUser(res.data);
      return true;
    } catch (err) {
      alert("Invalid email or password");
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      const res = await apiSignup(userData);
      setUser(res.data);
      return true;
    } catch (err) {
      alert("Signup failed: " + err.response?.data);
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);




