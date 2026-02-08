import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";

const ClientPrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user.isLogged) {
    return <Navigate to="/login" replace />;
  }

  // Optional: force profile setup
  if (!user.phone || !user.gender) {
    return <Navigate to="/profile-setup" replace />;
  }


  return children;
};

export default ClientPrivateRoute;
