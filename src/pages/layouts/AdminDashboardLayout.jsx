import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "../../hooks/auth";
import DashboardLayout from "./DashboardLayout";

// Loading Dashboard css
import "../../assets/scss/dashboard.scss"
import { useLC } from "../../hooks/admin";


export default function AdminDashboardLayout()
{
    const { isLoading, isActive } = useLC()
    const { isAuthenticated, isAdmin } = useUser()

    if (!isAuthenticated || !isAdmin)
        return <Navigate to="/login" replace={true} />

    if (!isLoading && !isActive)
    {
        return <Navigate to="/admin/license" />
    }

    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    )
}
