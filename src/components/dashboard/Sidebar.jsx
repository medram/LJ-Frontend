import { faFile, faGaugeHigh, faGear, faUserGroup } from "@fortawesome/free-solid-svg-icons";
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
                <Link to="#"><FontAwesomeIcon icon={faFile} size="lg" /> Pages</Link>
                <Link to="#"><FontAwesomeIcon icon={faGear} size="lg" /> Settings</Link>
                <Link to="#">Generate</Link>
            </nav>
        </aside>
    )
}
