import { faCreditCard, faFile, faGaugeHigh, faGem, faRankingStar, faRepeat, faSliders, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import { useDashboardSettings, useLCInfo } from "../../hooks";
import TablerIcon from "../TablerIcon";
import { IconAdjustmentsHorizontal, IconCreditCard, IconFiles, IconGauge, IconLayoutDashboard, IconPackages, IconUsers } from "@tabler/icons-react";


export default function Sidebar({ show })
{
    const { isExtendedLicense: isLC } = useLCInfo()
    const { settings } = useDashboardSettings()

    let classes = "dashboard-sidebar"
    if (show)
        classes += " show"

    return (
        <aside className={`${classes} d-flex flex-column justify-content-between`}>
            <nav>
                <NavLink to="/admin/"><TablerIcon icon={IconLayoutDashboard} stroke={1.25} size={30} /> Dashboard</NavLink>
                <NavLink to="customers"><TablerIcon icon={IconUsers} stroke={1.25} size={30} /> Customers</NavLink>
                {isLC && (
                    <>
                        <NavLink to="plans"><TablerIcon icon={IconPackages} stroke={1.25} size={30} /> Plans</NavLink>
                        <NavLink to="subscriptions"><FontAwesomeIcon icon={faGem} size="lg" /> Subscriptions</NavLink>
                        <NavLink to="payment-methods"><TablerIcon icon={IconCreditCard} stroke={1.25} size={30} /> Payment Methods</NavLink>
                    </>
                )}
                <NavLink to="pages"><TablerIcon icon={IconFiles} stroke={1.25} size={30} /> Pages</NavLink>
                <NavLink to="settings"><TablerIcon icon={IconAdjustmentsHorizontal} stroke={1.25} size={30} /> Settings</NavLink>
            </nav>
            <div className="text-center py-3">v{settings?.APP_VERSION}</div>
        </aside>
    )
}
