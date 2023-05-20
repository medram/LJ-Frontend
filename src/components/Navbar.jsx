import { Link, NavLink } from "react-router-dom";
import { useSettings } from "../hooks";
import { useUser } from "../hooks/auth";
import Logo from "./Logo";
import SectionLoading from "./SectionLoading";
import { memo } from "react";


export default memo(function Navbar()
{
    const { isLoading, settings } = useSettings()
    const { isAuthenticated, user } = useUser()

    if (isLoading || !Object.keys(settings).length)
    {
        return <SectionLoading center={true} />
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Logo settings={settings} className="navbar-brand" to="/" />

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/pricing">Pricing</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav navbar-right">
                        {isAuthenticated? (
                            <li className="nav-item"><Link to="/admin" className="nav-link" >Account</Link></li>
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
