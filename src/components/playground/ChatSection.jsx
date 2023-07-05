import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuperButton from "../SuperButton";
import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";
import { faPaperPlane, faStop, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import SectionLoading from "../SectionLoading";
import useChatRoom from "../../hooks/account";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { clearChatHistory, sendPrompt } from "../../api/account";
import PlaceholderMessage from "./PlaceholderMessage";
import { useScrollToRef } from "../../hooks";


export default function ChatSection({ uuid })
{
    // const { uuid } = useParams()
    const queryClient = useQueryClient()
    const { isLoading, isError, error, chat } = useChatRoom(uuid)
    const [ chatHistory, setChatHistory ] = useState([])
    const [ prompt, setPrompt ] = useState("")
    const [ isSending, setSending ] = useState(false)
    const [isClearingChatHistory, setClearingChatHistory ] = useState(false)
    const [promptRef, scrollToPrompt] = useScrollToRef()


    useEffect(() => {
        if (chat?.chat_history)
        {
            try
            {
                let messages = []
                JSON.parse(chat?.chat_history).map((history, i) => {
                    if (history.type === "ai")
                        messages[i] = <AIMessage key={i} content={history.content} />
                    else
                        messages[i] = <UserMessage key={i} content={history.content} />
                })

                setChatHistory(messages)
            } catch (error){
                console.log("error parsing chat history")
            }
        }
        else
        {
            setChatHistory([<AIMessage key={Math.random()} content="Hi, How can I assist you today?" />])
        }

        scrollToPrompt()
    }, [isLoading, chat])

    useEffect(() => {
        scrollToPrompt()
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        setSending(true)

        setChatHistory(chatHistory => {
            return [
                ...chatHistory,
                <UserMessage key={Math.random()} content={prompt} />,
                <PlaceholderMessage key={Math.random()} />
            ]
        })
        setPrompt("") // clear the prompt
        scrollToPrompt()

        sendPrompt(uuid, prompt).then(data => {
            if (!data?.errors) {
                setChatHistory(chatHistory => {
                    // remove the PlaceholderMessage first, before appending the reply
                    return [...(chatHistory.slice(0, -1)), <AIMessage key={Math.random()} content={data?.response?.output?.trim()} />]
                })
            }
            else {
                toast.error(data.message)
                setChatHistory(chatHistory => {
                    // remove the PlaceholderMessage first, before appending the reply
                    return chatHistory.slice(0, -1)
                })
            }
        }).catch(err => {
            toast.error(err)
            setChatHistory(chatHistory => {
                // remove the PlaceholderMessage first, before appending the reply
                return chatHistory.slice(0, -1)
            })
        }).finally(() => {
            setSending(false)
            // scroll down
            queryClient.invalidateQueries(`user.chat.${uuid}`)
            scrollToPrompt()
        })
    }

    const handleClearChatHistory = useCallback(() => {
        setClearingChatHistory(true)

        clearChatHistory(uuid).then(req => {
            if (req.status === 204)
            {
                toast.success("Cleared successfully.")
                setChatHistory([])
            }
            else
            {
                toast.warning("Something went wrong!")
            }
        }).catch(err => {
            toast.error(err)
        }).finally(() => {
            setClearingChatHistory(false)
        })
    }, [uuid])


    if (isLoading)
    {
        return <SectionLoading center={true} />
    }

    if (isError)
    {
        toast.error(error)
    }


    return (
        <>
            <div className="chats flex-grow-1 d-flex align-items-end">
                <div className="container px-4">
                    {chatHistory.map((message, i) => message)}
                </div>
            </div>
            <div className="container prompt-input d-flex gap-2 pt-5 pb-5 px-4" ref={promptRef}>
                <form onSubmit={handleSubmit} className="flex-grow-1">
                    <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="form-control form-control-lg" placeholder="Ask anything..." />
                </form>

                <SuperButton className="btn btn-primary btn-lg" onClick={handleSubmit}>
                    {isSending ? (
                        <FontAwesomeIcon icon={faStop} />
                    ) : (
                        <FontAwesomeIcon icon={faPaperPlane} />
                    )}
                </SuperButton>

                <SuperButton className="btn btn-secondary" isLoading={isClearingChatHistory} title="Clear Chat History" onClick={handleClearChatHistory}><FontAwesomeIcon icon={faTrashCan} /></SuperButton>
            </div>
        </>
    )
}
