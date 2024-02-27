import AIAvatar from "@images/playground/AI-avatar.png"
import Markdown from 'react-markdown'


export default function AIMessage({ content }: { content: string })
{
    console.log("AI: ", content)
    return (
        <div className="message-container">
            <img src={AIAvatar} className="avatar" />
            <div className="message ai-message">
                <Markdown>{content}</Markdown>
            </div>
        </div>
    )
}
