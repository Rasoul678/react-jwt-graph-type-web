import { Navigate, Outlet, RouteProps } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute: React.FC<RouteProps> = () => {
  const { isLoading, isAuth } = useAuth();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
