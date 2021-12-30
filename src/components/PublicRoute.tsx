import { Navigate, Outlet, RouteProps } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute: React.FC<RouteProps> = () => {
  const { isLoading, isAuth } = useAuth();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
