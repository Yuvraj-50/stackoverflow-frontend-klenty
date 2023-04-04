import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  return user.isAuthenticated ? children : <Navigate to="/signin" />;
};

export const Guest = ({ children }) => {
  const user = useSelector((state) => state.user);
  return !user.isAuthenticated ? children : <Navigate to="/" replace={true} />;
};
