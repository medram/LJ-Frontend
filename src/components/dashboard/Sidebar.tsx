import TablerIcon from "@components/TablerIcon";
import { faGem } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDashboardSettings, useLCInfo } from "@hooks/index";
import { IconAdjustmentsHorizontal, IconCpu, IconCreditCard, IconFiles, IconKey, IconLayoutDashboard, IconPackages, IconUsers } from "@tabler/icons-react";
import { memo } from "react";
import { NavLink } from "react-router-dom";


type SidebarProps = {
    show?: boolean
}

export default memo(function Sidebar({ show }: SidebarProps)
{
    const { isExtendedLicense: isLC } = useLCInfo()
    const { settings } = useDashboardSettings()

    let classes = "dashboard-sidebar"
    if (show)
        classes += " show"

    return (
        <aside className={`${classes} d-flex flex-column justify-content-between`}>
            <nav>
                <NavLink to="" end>
                    <TablerIcon icon={IconLayoutDashboard} stroke={1.25} size={30} /> Dashboard
                </NavLink>
                <NavLink to="customers">
                    <TablerIcon icon={IconUsers} stroke={1.25} size={30} /> Customers
                </NavLink>
                {isLC && (
                    <>
                        <NavLink to="plans"><TablerIcon icon={IconPackages} stroke={1.25} size={30} /> Plans</NavLink>
                        <NavLink to="subscriptions"><FontAwesomeIcon icon={faGem} size="lg" /> Subscriptions</NavLink>
                        <NavLink to="payment-gateways"><TablerIcon icon={IconCreditCard} stroke={1.25} size={30} /> Payment Gateways</NavLink>
                    </>
                )}
                <NavLink to="pages">
                    <TablerIcon icon={IconFiles} stroke={1.25} size={30} /> Pages
                </NavLink>
                <NavLink to="ai-settings">
                    <TablerIcon icon={IconCpu} stroke={1.25} size={30} /> AI Settings
                </NavLink>
                <NavLink to="api-keys">
                    <TablerIcon icon={IconKey} stroke={1.25} size={30} /> API keys
                </NavLink>
                <NavLink to="settings">
                    <TablerIcon icon={IconAdjustmentsHorizontal} stroke={1.25} size={30} /> Settings
                </NavLink>
            </nav>
            <div className="text-center py-3">v{settings?.APP_VERSION}</div>
        </aside>
    )
})
