import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/auth"


export default function UserRequired() {
    const { isAuthenticated, isAdmin } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated)
            navigate("/login", { replace: true })
    }, [isAuthenticated])

    return (
        <Outlet />
    )
}
