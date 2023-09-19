import AIAvatar from "@images/playground/AI-avatar3.png"

export default function AIMessage({ content })
{
    const parsedContent = content.split("\n").map((str, i) => <p key={i}>{str}</p>)

    return (
        <div className="message ai-message">
            <img src={AIAvatar} className="avatar" />

            {parsedContent}
        </div>
    )
}
