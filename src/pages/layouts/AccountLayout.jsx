import { Navigate, Outlet } from "react-router-dom";
import BasePage from "./BasePage";
import { useUser } from "../../hooks/auth";


export default function AccountLayout()
{
    const { isAuthenticated } = useUser()

    if (!isAuthenticated)
        return <Navigate to="/login" replace={true} />


    return (
        <BasePage>
            <Outlet />
        </BasePage>
    )
}
