import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { useUser } from "../../hooks/auth";
import DashboardLayout from "./DashboardLayout";

// Loading Dashboard css
import "../../assets/scss/dashboard.scss"


export default function AdminDashboardLayout()
{
    const { isAuthenticated, isAdmin } = useUser()


    if (!isAuthenticated || !isAdmin)
        return <Navigate to="/login" replace={true} />

    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    )
}
