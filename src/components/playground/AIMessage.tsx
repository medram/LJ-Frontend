import AIAvatar from "@images/playground/AI-avatar.png"
import Markdown from 'react-markdown'


export default function AIMessage({ content }: { content: string })
{
    // const parsedContent = content.split("\n").map((str, i) => <p key={i}>{str}</p>)

    return (
        <div className="message ai-message">
            <img src={AIAvatar} className="avatar" />

            <Markdown>{content}</Markdown>
        </div>
    )
}
