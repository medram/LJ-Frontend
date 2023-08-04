

export default function AIMessage({ content })
{
    const parsedContent = content.split("\n").map((str, i) => <p key={i}>{str}</p>)

    return (
        <div className="message ai-message">
            {parsedContent}
        </div>
    )
}
