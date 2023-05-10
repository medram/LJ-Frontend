import { Link } from "react-router-dom";


export default function Logo({settings, className="", to="/"})
{
    return <Link to={to} className={className}>
        {settings?.SHOW_LOGO ? (
            <img src={settings?.SITE_LOGO} style={{ maxWidth: "250px", maxHeight: "70px" }} />
        ) : settings?.SITE_NAME}
    </Link>
}
