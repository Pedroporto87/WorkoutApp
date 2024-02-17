import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
}
export default RequireAuth;
