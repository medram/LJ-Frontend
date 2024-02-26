import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useUser } from "../../hooks/auth";
import DashboardLayout from "./DashboardLayout";

// Loading Dashboard css
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import "@assets/scss/dashboard.scss";
import { useLC } from "@hooks/admin";


export default function AdminDashboardLayout()
{
    const location = useLocation()
    const { isActive } = useLC()
    const { isAuthenticated, isAdmin } = useUser()

    if (!isActive)
        return <Navigate to="/admin/license" />

    if (!isAuthenticated || !isAdmin)
        return <Navigate to="/login" replace={true} />


    return (
        <SectionErrorBoundary key={location.pathname}>
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        </SectionErrorBoundary>
    )
}
