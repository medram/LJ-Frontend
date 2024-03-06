import AIAvatar from "@images/playground/AI-avatar.png"
import ReactMarkdown from 'react-markdown'
import gfm from "remark-breaks"
import remarkGfm from 'remark-gfm'

export default function AIMessage({ content }: { content: string })
{
    return (
        <div className="message-container">
            <img src={AIAvatar} className="avatar" />
            <div className="message ai-message">
                <ReactMarkdown remarkPlugins={[gfm, remarkGfm]}>{content}</ReactMarkdown>
            </div>
        </div>
    )
}
