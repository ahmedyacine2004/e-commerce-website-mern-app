import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";

function SignupGuard({ children, step }) {
  const { user } = useContext(UserContext);
  const signupEmail =
    typeof window !== "undefined"
      ? sessionStorage.getItem("signupEmail")
      : null;
  const signupPending = Boolean(signupEmail);

  if (!user.isLogged && !signupPending) {
    return <Navigate to="/register" replace />;
  }

  if (
    step === "profile-setup" &&
    user.isLogged &&
    (user.phone || user.gender)
  ) {
    return <Navigate to="/verify" replace />;
  }

  if (step === "verify" && user.isLogged && (!user.phone || !user.gender)) {
    return <Navigate to="/profile-setup" replace />;
  }

  return children;
}

export default SignupGuard;
