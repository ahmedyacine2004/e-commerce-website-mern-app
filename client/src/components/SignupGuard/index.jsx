import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";

function SignupGuard({ children, step }) {
  const { user } = useContext(UserContext);

  if (!user.isLogged) {
    return <Navigate to="/login" replace />;
  }

  if (step === "profile-setup" && (user.phone || user.gender)) {
    return <Navigate to="/verify" replace />;
  }

  if (step === "verify" && (!user.phone || !user.gender)) {
    return <Navigate to="/profile-setup" replace />;
  }

  return children;
}

export default SignupGuard;
