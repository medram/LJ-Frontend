import SpinnerGrow from "../SpinnerGrow";



export default function PlaceholderMessage({ content }) {
    return (
        <div className="message ai-message">
            <SpinnerGrow size="sm" /> {content ? content : " Thinking..."}
        </div>
    )
}
