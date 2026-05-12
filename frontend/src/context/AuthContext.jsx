import { createContext, useEffect, useState } from "react";
import axios from "axios";
import server from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("dhara_user");
    const storedToken = localStorage.getItem("dhara_token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${server}/api/auth/login`, { email, password });
      const responseData = res.data.data || res.data;
      const { token: newToken, user: newUser } = responseData;

      setUser(newUser);
      setToken(newToken);
      localStorage.setItem("dhara_user", JSON.stringify(newUser));
      localStorage.setItem("dhara_token", newToken);
      
      return { success: true, message: res.data.message || "Login successful", user: newUser };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      return { success: false, message };
    }
  };

  const signup = async (name, email, password, phone, role) => {
    try {
      const res = await axios.post(`${server}/api/auth/signup`, {
        name,
        email,
        password,
        phone,
        role
      });
      
      const responseData = res.data.data || res.data;
      const { token: newToken, user: newUser } = responseData;

      setUser(newUser);
      setToken(newToken);
      localStorage.setItem("dhara_user", JSON.stringify(newUser));
      localStorage.setItem("dhara_token", newToken);

      return { success: true, message: res.data.message || "Signup successful", user: newUser };
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      return { success: false, message };
    }
  };

  const googleLogin = async (token, isAccessToken = false) => {
    try {
      const payload = isAccessToken ? { accessToken: token } : { idToken: token };
      const res = await axios.post(`${server}/api/auth/google`, payload);
      const responseData = res.data.data || res.data;
      const { token: newToken, user: newUser } = responseData;

      setUser(newUser);
      setToken(newToken);
      localStorage.setItem("dhara_user", JSON.stringify(newUser));
      localStorage.setItem("dhara_token", newToken);

      return { success: true, message: res.data.message || "Google login successful", user: newUser };
    } catch (error) {
      const message = error.response?.data?.message || "Google login failed";
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("dhara_user");
    localStorage.removeItem("dhara_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, googleLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
