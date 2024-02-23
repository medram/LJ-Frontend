import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "../hooks/auth";
import FullscreenLoading from "../components/FullscreenLoading";
import { useEffect } from "react";


export default function LogoutPage()
{
    const navigate = useNavigate()
    const { isAuthenticated } = useUser()
    const { Logout } = useAuth()

    useEffect(() => {
        if (isAuthenticated)
        {
            Logout().then(() => {
                navigate("/login", { replace: true })
            })
        }
    }, [])

    return <FullscreenLoading />
}
