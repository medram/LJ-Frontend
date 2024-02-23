
type SpinnerProps = {
    size?: "sm",
    className?: string,
    [key: string]: unknown
}

export default function SpinnerGrow({ size, className="", ...rest }: SpinnerProps)
{
    let extraClasses = ""
    if (size === "sm")
        extraClasses += "spinner-grow-sm"

    return <span className={["spinner-grow", extraClasses, className].join(" ")} {...rest} role="status" aria-hidden="true"></span>
}
