import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";

/**
 * ClientPublicRoute
 * Prevents logged-in users from accessing public routes like /login or /register
 */
function ClientPublicRoute({ children }) {
  const { user } = useContext(UserContext);

  // If user is logged in, redirect to homepage
  if (user?.isLogged) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the public route
  return children;
}

export default ClientPublicRoute;
