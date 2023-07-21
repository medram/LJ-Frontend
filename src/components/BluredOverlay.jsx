

export default function BluredOverlay({ title="", blur=3, children })
{
    return (
        <div className="blured-overlay">
            <div style={{
                filter: `blur(${blur}px)`
            }}>
                {children}
            </div>

            <span className="title">{title}</span>
        </div>
    )
}
