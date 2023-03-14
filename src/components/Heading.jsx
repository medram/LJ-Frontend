
export default function Heading({ title, subTitle })
{
    return (
        <div className="py-5 text-center heading bg-light">
            <h1>{title}</h1>
            {subTitle && (<span className="text-muted">{subTitle}</span>)}
        </div>
    )
}
