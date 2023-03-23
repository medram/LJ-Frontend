import { faFile, faGaugeHigh, faGrip, faRankingStar, faRepeat, faSliders, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


export default function Sidebar({ show })
{
    let classes = "dashboard-sidebar"
    if (show)
        classes += " show"

    return (
        <aside className={classes}>
            <nav>
                <Link to=""><FontAwesomeIcon icon={faGaugeHigh} size="lg" /> Dashboard</Link>
                <Link to="customers"><FontAwesomeIcon icon={faUserGroup} size="lg" /> Customers</Link>
                <Link to="subscriptions"><FontAwesomeIcon icon={faRepeat} size="lg" /> Subscriptions</Link>
                <Link to="plans"><FontAwesomeIcon icon={faRankingStar} size="lg" /> Plans</Link>
                <Link to="#"><FontAwesomeIcon icon={faFile} size="lg" /> Pages</Link>
                <Link to="#"><FontAwesomeIcon icon={faSliders} size="lg" /> Settings</Link>
                <Link to="#"><FontAwesomeIcon icon={faGrip} size="lg" /> Gallery</Link>
                <Link to="#">Generate</Link>
            </nav>
        </aside>
    )
}
