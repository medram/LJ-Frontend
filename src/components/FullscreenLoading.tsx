
export default function FullscreenLoading()
{
    return (
        <div className="bg-primary text-light d-flex justify-content-center align-items-center  fullscreen-loading">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
