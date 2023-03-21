import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getSettings } from "../../api";
import { useSettings } from "../../hooks";
import { useAuth, useUser } from "../../hooks/auth";
import Avatar from "../Avatar";


export default function Navbar({ sidebarStatus, toggleSidebar, onClickBars })
{
    const settings = useSettings()

    const { user } = useUser()
    const { Logout } = useAuth()
    const [showRightNav, toggleRightNav] = useState(false);
    const rightNav = useRef();

    let properIcon = sidebarStatus? "x" : "menu"
    let rightNavProperIcon = showRightNav ? "x" : "more-vertical"

    useEffect(() => {
        if (sidebarStatus && showRightNav) {
            toggleRightNav(false)
        }
    }, [sidebarStatus])

    useEffect(() => {
        if (showRightNav && sidebarStatus)
            toggleSidebar(false)


        if (showRightNav)
        {
            rightNav.current.classList.add('show')
        }
        else
        {
            rightNav.current.classList.remove('show')
        }
    }, [showRightNav])

    const handleLogout = () => {
        Logout()
    }


    return <>
        <span className="bars" onClick={(e) => onClickBars(e)}><FeatherIcon icon={properIcon} strokeWidth={1.5} /></span>
        <div className="dashboard-brand"><Link to="/admin">{settings?.SITE_NAME}</Link></div>
        <span className="dots" onClick={() => toggleRightNav(show => !show)}><FeatherIcon icon={rightNavProperIcon} strokeWidth={1.5} /></span>

        <nav className="right-nav" ref={rightNav}>
            <div className="d-md-none d-flex flex-column align-items-center mb-4">
                <Avatar src="https://dolinker-demo.mr4web.com/uploads/users/profile-images/30700620a0490526be49accbfdfa50cb.png?v=84111" alt="Avatar" size={100} className="my-3" />
                <span>Hi, Mohammed</span>
            </div>
            <Link to=""><FeatherIcon icon="bell" strokeWidth={1.5} /> <span className="d-md-none">Notifications</span></Link>
            <div className="d-md-none">
                <Link to=""><FeatherIcon icon="layout" strokeWidth={1.5} /> Dashboard</Link>
                <Link to=""><FeatherIcon icon="user" /> Profile</Link>
                <Link to=""><FeatherIcon icon="log-out" /> Logout</Link>
            </div>
        </nav>
        <div className="btn-group avatar-dropdown">
            <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                <Avatar src="https://dolinker-demo.mr4web.com/uploads/users/profile-images/30700620a0490526be49accbfdfa50cb.png?v=84111" alt="Avatar" size={45} /> Hi, {user.username}
            </button>
            <div className="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
                <Link className="dropdown-item"><FeatherIcon icon="user" /> Profile</Link>
                <hr className="dropdown-divider" />
                <Link onClick={handleLogout} className="dropdown-item"><FeatherIcon icon="log-out" /> Logout</Link>
            </div>
        </div>
    </>
}
