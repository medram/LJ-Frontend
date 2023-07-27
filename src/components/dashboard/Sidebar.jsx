import { faCreditCard, faFile, faGaugeHigh, faRankingStar, faRepeat, faSliders, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useDashboardSettings, useLCInfo } from "../../hooks";


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
                <Link to=""><FontAwesomeIcon icon={faGaugeHigh} size="lg" /> Dashboard</Link>
                <Link to="customers"><FontAwesomeIcon icon={faUserGroup} size="lg" /> Customers</Link>
                {isLC && (
                    <>
                        <Link to="plans"><FontAwesomeIcon icon={faRankingStar} size="lg" /> Plans</Link>
                        <Link to="subscriptions"><FontAwesomeIcon icon={faRepeat} size="lg" /> Subscriptions</Link>
                        <Link to="payment-methods"><FontAwesomeIcon icon={faCreditCard} size="lg" /> Payment Methods</Link>
                    </>
                )}
                <Link to="pages"><FontAwesomeIcon icon={faFile} size="lg" /> Pages</Link>
                <Link to="settings"><FontAwesomeIcon icon={faSliders} size="lg" /> Settings</Link>
            </nav>
            <div className="text-center py-3">v{settings?.APP_VERSION}</div>
        </aside>
    )
}
