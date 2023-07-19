import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";

const PrivateRoutes = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) return <Loading />;

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoutes;
