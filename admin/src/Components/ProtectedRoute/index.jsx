import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AdminContext from "../../Contexts/AdminContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AdminContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
