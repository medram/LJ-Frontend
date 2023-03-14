
export default function Avatar(props)
{
    let { size, className, ...rest } = props

    return <img {...rest} width={size} height={size} className={`avatar ${className}`} />
}
