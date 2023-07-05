
export default function SpinnerGrow({ size, className, ...rest })
{
    let extraClasses = ""
    if (size === "sm")
        extraClasses += "spinner-grow-sm"

    return <span className={["spinner-grow", extraClasses, className].join(" ")} {...rest} role="status" aria-hidden="true"></span>
}
