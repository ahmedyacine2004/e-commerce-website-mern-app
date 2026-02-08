import { useState, useEffect } from "react";
import UserContext from "../Contexts/UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    isLogged: false,
    fullName: null,
    email: null,
    phone: null,
    dob: null,
    gender: null,
    pfp: "./images/pfp-placeholder.png",
    token: null,
  });

  // Load user from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({
        ...JSON.parse(savedUser),
        isLogged: true,
        token,
      });
    }
  }, []);

  const login = (userData) => {
    setUser({
      id: userData.id,
      isLogged: true,
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone || "",
      dob: userData.dob || "",
      gender: userData.gender || "",
      pfp: userData.pfp || "./images/pfp-placeholder.png",
      token: userData.token,
    });

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser({
      id: null,
      isLogged: false,
      fullName: null,
      email: null,
      phone: null,
      dob: null,
      gender: null,
      pfp: "./images/pfp-placeholder.png",
      token: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
