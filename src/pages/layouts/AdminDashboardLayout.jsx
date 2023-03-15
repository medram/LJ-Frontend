import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useUser } from "../../hooks/auth";
import DashboardLayout from "./DashboardLayout";

// Loading Dashboard css
import "../../assets/scss/dashboard.scss"


export default function AdminDashboardLayout()
{
    const { isAuthenticated, isAdmin } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated || !isAdmin)
            navigate("/login", { replace: true })
    }, [isAuthenticated, isAdmin])

    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    )
}
