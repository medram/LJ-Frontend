import { useEffect } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/auth"


export default function NoAuthRequired()
{
    const {isAuthenticated, isAdmin} = useUser()


    if (isAuthenticated && isAdmin)
        return <Navigate to="/admin" replace={true} />
    else if (isAuthenticated)
        return <Navigate to="/account" replace={true} />

    return (
        <Outlet />
    )
}
