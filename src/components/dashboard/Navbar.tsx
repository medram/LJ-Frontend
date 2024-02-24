import AvatarPalceholder from "@components/AvatarPalceholder";
import Logo from "@components/Logo";
import TablerIcon from "@components/TablerIcon";
import { faBarsStaggered, faEllipsisV, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@hooks/auth";
import { useDemo, useSettings } from "@hooks/index";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


export default memo(function Navbar({ sidebarStatus, toggleSidebar, onClickBars })
{
    const { isDemo } = useDemo()
    const { isLoading, settings } = useSettings()

    const { user } = useUser()
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


    return <>
        <span className="bars" onClick={(e) => onClickBars(e)}><FontAwesomeIcon icon={properIcon} /></span>
        <div className="dashboard-brand">
            <Logo settings={settings} isDemo={isDemo} />
        </div>
        <span className="dots" onClick={() => toggleRightNav(show => !show)}><FontAwesomeIcon icon={rightNavProperIcon} /></span>

        <nav className="right-nav" ref={rightNav}>
            <div className="d-md-none d-flex flex-column align-items-center mb-4">
                <AvatarPalceholder username={user.username} size={100} /> Hi, {user.username}
            </div>
            <div className="d-md-none">
                <Link to="/account/settings"><TablerIcon icon={IconUser} /> Profile</Link>
                <Link to="/logout"><TablerIcon icon={IconLogout} /> Logout</Link>
            </div>
        </nav>
        <div className="btn-group avatar-dropdown">
            <button className="btn btn-primary dropdown-toggle d-flex align-items-center gap-2" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                <AvatarPalceholder username={user.username} size={45} /> Hi, {user.username}
            </button>
            <div className="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
                <Link to="/account/settings" className="dropdown-item"><TablerIcon icon={IconUser} /> Profile</Link>
                <hr className="dropdown-divider" />
                <Link to="/logout" className="dropdown-item"><TablerIcon icon={IconLogout} /> Logout</Link>
            </div>
        </div>
    </>
})
