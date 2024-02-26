import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconLayoutDashboard, IconLogout, IconUser } from "@tabler/icons-react";
import { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLCInfo, useSettings } from "../hooks";
import { useUser } from "../hooks/auth";
import AvatarPalceholder from "./AvatarPalceholder";
import Logo from "./Logo";
import TablerIcon from "./TablerIcon";


export default memo(function Navbar()
{
    const { isExtendedLicense } = useLCInfo()
    const { settings } = useSettings()
    const { isAuthenticated, user, isAdmin } = useUser()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-override">
            <div className="container">
                <Logo settings={settings} className="navbar-brand" to="/" />

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBarsStaggered} />
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        {isExtendedLicense && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/pricing">Pricing</NavLink>
                            </li>
                        )}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/playground">Playground</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                        {isAuthenticated? (
                            <>
                                <div className="btn-group avatar-dropdown">
                                    <button className="btn text-white dropdown-toggle d-flex align-items-center gap-2" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                                        <AvatarPalceholder username={user.username} size={45} /> Hi, {user.username}
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
                                        {isAdmin && (
                                            <Link className="dropdown-item" to="/admin/"><TablerIcon icon={IconLayoutDashboard} /> Dashboard</Link>
                                        )}
                                        <Link to="/account/settings" className="dropdown-item"><TablerIcon icon={IconUser} /> Profile</Link>
                                        <hr className="dropdown-divider" />
                                        <Link to="/logout" className="dropdown-item"><TablerIcon icon={IconLogout} /> Logout</Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Sign In</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">Sign Up</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
})
