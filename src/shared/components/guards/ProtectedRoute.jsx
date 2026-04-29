import { Navigate, Outlet } from "react-router-dom";

const useIsAuthenticated = () => {
  return true; // change later
};

export default function ProtectedRoute() {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // ✅ important
}