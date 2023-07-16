import { Navigate } from "react-router-dom";
import { useAuth, useUser } from "../hooks/auth";
import FullscreenLoading from "../components/FullscreenLoading";


export default function LogoutPage()
{
    const { isAuthenticated } = useUser()
    const { Logout } = useAuth()

    if (isAuthenticated)
    {
        Logout()
        return <Navigate to="/login" />
    }

    return <FullscreenLoading />
}
