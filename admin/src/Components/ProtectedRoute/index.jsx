import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AdminContext from "../../Contexts/AdminContext";
import LoadingSpinner from "../LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AdminContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
