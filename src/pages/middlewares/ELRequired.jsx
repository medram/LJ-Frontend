import { Navigate, Outlet } from "react-router-dom";
import { useLCInfo } from "../../hooks";
import FullscreenLoading from "../../components/FullscreenLoading";


export default function ELRequired({ to="/admin" })
{
    const { isLoading, isExtendedLicense } = useLCInfo()

    if (isLoading)
    {
        return <FullscreenLoading />
    }
    else if (!isLoading && !isExtendedLicense)
    {
        return <Navigate to={to} replace={true} />
    }

    return <Outlet />
}
