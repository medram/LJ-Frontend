import { faArrowRightFromBracket, faBarsStaggered, faBell, faEllipsisV, faGaugeHigh, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../../hooks";
import { useAuth, useUser } from "../../hooks/auth";
import Avatar from "../Avatar";
import FullscreenLoading from "../FullscreenLoading"
import SectionLoading from "../SectionLoading";
import Logo from "../Logo";


export default function Navbar({ sidebarStatus, toggleSidebar, onClickBars })
{
    const { isLoading, settings } = useSettings()

    const { user } = useUser()
    const { Logout } = useAuth()
    const [showRightNav, toggleRightNav] = useState(false);
    const rightNav = useRef();

    let properIcon = sidebarStatus? faXmark : faBarsStaggered
    let rightNavProperIcon = showRightNav ? faXmark : faEllipsisV

    useEffect(() => {
        if (sidebarStatus && showRightNav) {
            toggleRightNav(false)
        }
    }, [sidebarStatus])

    useEffect(() => {
        if (!isLoading)
        {
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
        }
    }, [showRightNav])

    const handleLogout = () => {
        Logout()
    }

    if (isLoading)
    {
        return <SectionLoading center={true} />
    }

    return <>
        <span className="bars" onClick={(e) => onClickBars(e)}><FontAwesomeIcon icon={properIcon} /></span>
        <div className="dashboard-brand">
            <Logo settings={settings} />
        </div>
        <span className="dots" onClick={() => toggleRightNav(show => !show)}><FontAwesomeIcon icon={rightNavProperIcon} /></span>

        <nav className="right-nav" ref={rightNav}>
            <div className="d-md-none d-flex flex-column align-items-center mb-4">
                <Avatar src="https://dolinker-demo.mr4web.com/uploads/users/profile-images/30700620a0490526be49accbfdfa50cb.png?v=84111" alt="Avatar" size={100} className="my-3" />
                <span>Hi, Mohammed</span>
            </div>
            <Link to=""><FontAwesomeIcon icon={faBell} /> <span className="d-md-none">Notifications</span></Link>
            <div className="d-md-none">
                <Link to=""><FontAwesomeIcon icon={faGaugeHigh} /> Dashboard</Link>
                <Link to=""><FontAwesomeIcon icon={faUser} /> Profile</Link>
                <Link to=""><FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout</Link>
            </div>
        </nav>
        <div className="btn-group avatar-dropdown">
            <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                <Avatar src="https://dolinker-demo.mr4web.com/uploads/users/profile-images/30700620a0490526be49accbfdfa50cb.png?v=84111" alt="Avatar" size={45} /> Hi, {user.username}
            </button>
            <div className="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
                <Link className="dropdown-item"><FontAwesomeIcon icon={faUser} /> Profile</Link>
                <hr className="dropdown-divider" />
                <Link onClick={handleLogout} className="dropdown-item"><FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout</Link>
            </div>
        </div>
    </>
}
