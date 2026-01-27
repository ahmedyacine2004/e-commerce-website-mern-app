import { createContext } from "react";

// This context will store admin session info
const AdminContext = createContext({
  admin: null,          // { id, name, email, role, avatar }
  isLoggedIn: false,
  token: null,          // JWT or session token
  login: () => {},       // function to log in
  logout: () => {},      // function to log out
  updateProfile: () => {}, // function to update admin info
});

export default AdminContext;

