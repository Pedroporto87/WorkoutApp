import { useSelector } from 'react-redux';
import { selectCurrentToken } from "../features/authSlice";
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isAuthenticated = false;
    let email = "";

    if (token) {
        try {
            const decoded = jwtDecode(token);
            email = decoded.UserInfo.email;
            isAuthenticated = true;
        } catch (error) {
            console.error("Token decoding failed:", error);
        }
    }

    return { isAuthenticated, email };
}
export default useAuth;
