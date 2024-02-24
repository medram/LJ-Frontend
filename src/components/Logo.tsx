import { SettingsType } from "@/utils/types";
import { Link } from "react-router-dom";

type LogoProps = {
    settings: SettingsType,
    className?: string,
    to?: string,
    isDemo?: boolean
}

export default function Logo({settings, className="", to="/", isDemo=false}: LogoProps)
{
    return <Link to={to} className={className}>
        {settings?.SHOW_LOGO ? (
            <img src={settings?.SITE_LOGO} style={{ maxWidth: "250px", maxHeight: "70px" }} />
        ) : settings?.SITE_NAME}
        {isDemo && (
            <span className="badge text-bg-success" style={{fontSize: "0.7rem"}}>demo</span>
        )}
    </Link>
}
