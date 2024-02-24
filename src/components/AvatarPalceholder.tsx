import { AvatarProps } from "./Avatar"

type AvatarPalceholderProps = AvatarProps & {
    username?: string
}

export default function AvatarPalceholder({ size=60, username="", ...rest}: AvatarPalceholderProps)
{
    return <span className="text-secondary bg-white border d-flex justify-content-center align-items-center" style={{
        display: "inline-block",
        borderRadius: "100%",
        width: size + "px",
        height: size + "px"
    }}>{username.slice(0, 2).toUpperCase()}</span>
}
