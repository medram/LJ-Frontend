import AIAvatar from "@images/playground/AI-avatar.png"
import { IconCheck, IconCopy } from "@tabler/icons-react"
import { useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import ReactMarkdown from 'react-markdown'
import gfm from "remark-breaks"
import remarkGfm from 'remark-gfm'
import TablerIcon from "../TablerIcon"
import { Link } from "./markdown_components/Link"


export default function AIMessage({ content }: { content: string })
{
    const [copied, setCopied] = useState(false)

    return (
        <div className="message-container">
            <img src={AIAvatar} className="avatar" />
            <div className="message ai-message">
                <CopyToClipboard text={content} className="copy-button" title="Copy" onCopy={() => {
                    setCopied(true)
                    setTimeout(() => setCopied(false), 3000)
                }}>
                    {copied ? (
                        <span style={{color: "green"}}><TablerIcon icon={IconCheck} stroke={2} size={20} /> <small>Copied</small></span>
                    ) : (
                        <span><TablerIcon icon={IconCopy} stroke={2} size={20} /></span>
                    )}
                </CopyToClipboard>
                <ReactMarkdown remarkPlugins={[gfm, remarkGfm]} components={{ a: Link }}>{content}</ReactMarkdown>
            </div>
        </div>
    )
}
