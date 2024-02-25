import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useUser } from "../../hooks/auth";
import DashboardLayout from "./DashboardLayout";

// Loading Dashboard css
import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import "@assets/scss/dashboard.scss";
import FullscreenLoading from "@components/FullscreenLoading";
import { useLC } from "@hooks/admin";
import { useLCInfo } from "@hooks/index";


export default function AdminDashboardLayout()
{
    const location = useLocation()
    const { isLoading, isActive } = useLC()
    const { isLoading: isLicenseTypeLoading, isExtendedLicense } = useLCInfo()

    const { isAuthenticated, isAdmin } = useUser()

    if (!isAuthenticated || !isAdmin)
        return <Navigate to="/login" replace={true} />

    if (!isLoading && !isActive)
    {
        return <Navigate to="/admin/license" />
    }

    if (isLicenseTypeLoading)
    {
        return <FullscreenLoading />
    }

    return (
        <SectionErrorBoundary key={location.pathname}>
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        </SectionErrorBoundary>
    )
}
