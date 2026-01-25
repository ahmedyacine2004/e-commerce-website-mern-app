import { useState } from "react";
import UserContext from "../Contexts/UserContext";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLogged: true,
    name: "Ahmed Yassine Abbane",
    email: "ahmedyacineabbane@gmail.com",
    phone: "", // ✅ added phone
    dob: "", // ✅ added date of birth
    gender: "", // ✅ added gender
    pfp: "./images/pfp-placeholder.png",
  });

  // Log in
  const login = (userData) => {
    setUser({
      ...userData,
      isLogged: true,
    });
  };

  // Log out
  const logout = () => {
    setUser({
      isLogged: false,
      name: null,
      email: null,
      phone: null,
      dob: null,
      gender: null,
      pfp: null,
    });
  };

  // Generic updater for any field
  const updateUser = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
