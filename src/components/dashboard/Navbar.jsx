import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


export default function Navbar({ sidebarStatus, onClickBars })
{
    const [showRightNav, toggleRightNav] = useState(false);
    const rightNav = useRef();

    let properIcon = sidebarStatus? "x" : "menu"

    useEffect(() => {
        //console.log(rightNav)
        if (showRightNav)
            rightNav.current.classList.add('show')
        else
            rightNav.current.classList.remove('show')
    }, [showRightNav])


    return <>
        <span className="bars" onClick={(e) => onClickBars(e)}><FeatherIcon icon={properIcon} strokeWidth={1.5} /></span>
        <div className="dashboard-brand"><Link to="/admin">LongJourney</Link></div>
        <span className="dots" onClick={() => toggleRightNav(show => !show)}><FeatherIcon icon="more-vertical" strokeWidth={1.5} /></span>

        <nav className="right-nav" ref={rightNav}>
            <a href="#" className="">Dashboard</a>
            <a href="#" className="">Users</a>
        </nav>
        <div className="btn-group avatar-dropdown">
            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                Hi, Mohammed
            </button>
            <ul className="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
                <li>
                    <Link className="dropdown-item">
                        <FeatherIcon icon="user" /> Profile
                    </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item"><FeatherIcon icon="log-out" /> Logout</Link></li>
            </ul>
        </div>
    </>
}
