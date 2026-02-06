import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";

const ClientPrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user.isLogged) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ClientPrivateRoute;
