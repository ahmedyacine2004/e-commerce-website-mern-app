/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import AdminContext from "../Contexts/AdminContext";

// Optional: load/save admin session to localStorage
const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Try to load from localStorage on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");
    const savedToken = localStorage.getItem("token");
    if (savedAdmin && savedToken) {
      setAdmin(JSON.parse(savedAdmin));
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = ({ adminData, token }) => {
    setAdmin(adminData);
    setToken(token);
    setIsLoggedIn(true);

    // Save to localStorage
    localStorage.setItem("admin", JSON.stringify(adminData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    setIsLoggedIn(false);

    localStorage.removeItem("admin");
    localStorage.removeItem("token");
  };

  const updateProfile = (updatedAdmin) => {
    setAdmin(updatedAdmin);
    localStorage.setItem("admin", JSON.stringify(updatedAdmin));
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        isLoggedIn,
        token,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
