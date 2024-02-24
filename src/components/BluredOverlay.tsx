import { ReactNode } from "react"

type BluredOverlayProps = {
    title: string,
    blur: number,
    children: ReactNode
}

export default function BluredOverlay({ title="", blur=3, children }: BluredOverlayProps)
{
    return (
        <div className="blured-overlay">
            <div>
                {children}
            </div>
            <div className="overlay" style={{
                backdropFilter: `blur(${blur}px)`
            }}></div>
            <span className="title">{title}</span>
        </div>
    )
}
