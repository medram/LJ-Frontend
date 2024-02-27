import SpinnerGrow from "../SpinnerGrow";


export default function PlaceholderMessage({ content=" Thinking..." }: { content?: string }) {
    return (
        <div className="message ai-message">
            <SpinnerGrow size="sm" /> {content}
        </div>
    )
}
