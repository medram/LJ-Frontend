import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "../../hooks/auth";
import DashboardLayout from "./DashboardLayout";

// Loading Dashboard css
import "../../assets/scss/dashboard.scss"
import { useLC } from "../../hooks/admin";
import { useLCInfo } from "../../hooks";
import FullscreenLoading from "../../components/FullscreenLoading";


export default function AdminDashboardLayout()
{
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
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    )
}
