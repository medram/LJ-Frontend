
export type AvatarProps = {
    size?: number,
    className?: string,
    [rest: string]: unknown
}

export default function Avatar({ size, className, ...rest }: AvatarProps)
{
    return <img {...rest} width={size} height={size} className={`avatar ${className}`} />
}
