import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


export default function Sidebar({ show })
{
    let classes = "dashboard-sidebar"
    if (show)
        classes += " show"

    return (
        <aside className={classes}>
            <nav>
                <Link to="#"><FeatherIcon icon="grid" strokeWidth={1.5} /> Dashboard</Link>
                <Link to="#"><FeatherIcon icon="users" strokeWidth={1.5} /> Users</Link>
                <Link to="#"><FeatherIcon icon="file-text" strokeWidth={1.5} /> Pages</Link>
                <Link to="#"><FeatherIcon icon="sliders" strokeWidth={1.5} /> Settings</Link>
                <Link to="#">Generate</Link>
            </nav>
        </aside>
    )
}
