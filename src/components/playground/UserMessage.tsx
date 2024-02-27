

export default function UserMessage({ content }: { content: string })
{
    return (
        <div className="message user-message">
            {content}
        </div>
    )
}
