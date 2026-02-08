import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";

function AuthGuard({ children }) {
  const { user } = useContext(UserContext);

  if (user.isLogged) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

export default AuthGuard;
