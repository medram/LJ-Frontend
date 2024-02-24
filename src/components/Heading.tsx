
export default function Heading({ title, subTitle } : { title: string, subTitle: string })
{
    return (
        <div className="py-5 text-center heading bg-light">
            <h1>{title}</h1>
            {subTitle && (<span className="text-muted">{subTitle}</span>)}
        </div>
    )
}
