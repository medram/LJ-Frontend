import { Navigate, Outlet } from "react-router-dom";
import { useLCInfo } from "../../hooks";

type ELRequiredProps = {
    to?: string,
    replace?: boolean
}

export default function ELRequired({ to="/admin", replace=false }: ELRequiredProps)
{
    const { isExtendedLicense } = useLCInfo()

    if (!isExtendedLicense)
    {
        return <Navigate to={to} replace={replace} />
    }

    return <Outlet />
}
