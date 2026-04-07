import { useState, useEffect } from "react";
import UserContext from "../Contexts/UserContext";
import socket from "../utils/socket";

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

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      const userData = JSON.parse(savedUser);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({ ...userData, isLogged: true, token });

      // Connect socket and emit online
      if (!socket.connected) socket.connect();
      socket.emit("client-online", {
        clientId: userData.id,
        ipAddress: userData.ipAddress || "::1",
      });
    }

    return () => {
      if (socket.connected && user.id) {
        socket.emit("client-logout", { clientId: user.id });
        socket.disconnect();
      }
    };
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

    // Connect socket and emit online
    if (!socket.connected) socket.connect();
    socket.emit("client-online", {
      clientId: userData.id,
      ipAddress: userData.ipAddress || "::1",
    });
  };

  const logout = () => {
    if (user.id && socket.connected) {
      socket.emit("client-logout", { clientId: user.id });
      socket.disconnect();
    }

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

    localStorage.removeItem("user");
    localStorage.removeItem("token");
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
