
export default function SectionLoading(props)
{
    let { title, spinnerClassName, className, ...rest } = props

    return (
        <div className={["d-flex justify-content-center align-items-center p-2", className].join(" ")} {...rest}>
            <span className={["spinner-border mx-2", spinnerClassName].join(" ")} role="status"></span>
            {title && <b>{title}</b>}
        </div>
    )
}
