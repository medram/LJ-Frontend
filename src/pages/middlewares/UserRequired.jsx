import { Navigate, Outlet } from "react-router-dom"
import { useUser } from "../../hooks/auth"


export default function UserRequired() {
    const { isAuthenticated, isAdmin } = useUser()

    if (!isAuthenticated)
        return <Navigate to="/login" replace={true} />

    return (
        <Outlet />
    )
}
