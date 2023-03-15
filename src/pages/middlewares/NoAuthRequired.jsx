import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/auth"


export default function NoAuthRequired()
{
    const {isAuthenticated, isAdmin} = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated && isAdmin)
            navigate("/admin", { replace: true })
        else if (isAuthenticated)
            navigate("/account", { replace: true })
    }, [isAuthenticated, isAdmin])

    return (
        <Outlet />
    )
}
