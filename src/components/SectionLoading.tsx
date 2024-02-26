
type SectionLoadingProps = {
    title?: string,
    spinnerClassName?: string,
    className?: string,
    center?: boolean,
    [rest: string]: unknown
}


export default function SectionLoading({ title, spinnerClassName, className, center=false, ...rest }: SectionLoadingProps)
{

    return (
        <div className={["section-loading", className, center && "w-100"].join(" ")} {...rest}>
            <span className={["spinner-border mx-2", spinnerClassName].join(" ")} role="status"></span>
            {title && <b>{title}</b>}
        </div>
    )
}
