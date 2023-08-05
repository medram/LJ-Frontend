import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuperButton from "../SuperButton";
import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";
import { faPaperPlane, faStop, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import SectionLoading from "../SectionLoading";
import useChatRoom from "../../hooks/account";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { clearChatHistory, sendPrompt, stopPrompt } from "../../api/account";
import PlaceholderMessage from "./PlaceholderMessage";
import { useDemo, useNaiveLocalStorage, useScrollToRef } from "../../hooks";
import { OverlayTrigger, Tooltip } from "react-bootstrap";


export default function ChatSection({ uuid })
{
    // const { uuid } = useParams()
    const { isDemo } = useDemo()
    const [getDemoSubscription, setDemoSubscription] = useNaiveLocalStorage("demo_sub")
    const demoSubscription = getDemoSubscription()

    const queryClient = useQueryClient()
    const { isLoading, isError, error, chat } = useChatRoom(uuid)
    const [ chatHistory, setChatHistory ] = useState([])
    const [ prompt, setPrompt ] = useState("")
    const [ isSending, setSending ] = useState(false)
    const [isClearingChatHistory, setClearingChatHistory ] = useState(false)
    const [promptRef, scrollToPrompt] = useScrollToRef()

    const DEFAULT_MESSAGE = <AIMessage key={Math.random()} content="Hi, How can I assist you today? 😄 " />

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

                setChatHistory([DEFAULT_MESSAGE, ...messages])
            } catch (error){
                console.log("error parsing chat history")
            }
        }
        else
        {
            setChatHistory([DEFAULT_MESSAGE])
        }

        scrollToPrompt()
    }, [isLoading, chat])

    useEffect(() => {
        scrollToPrompt()
    }, [])


    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        if (!prompt.trim())
        {
            return toast.warning("Please ask something.")
        }

        if (isDemo && demoSubscription?.questions <= 0)
        {
            return toast.warning("The demo quota is exceeded, please wait 12 hours 🙏")
        }

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
                const reply = data?.response?.output?.trim()

                if (!reply)
                {
                    toast.error("OpenAI servers are overloaded, please try again or later")
                }

                setChatHistory(chatHistory => {
                    // remove the PlaceholderMessage first, before appending the reply
                    return [...(chatHistory.slice(0, -1)), <AIMessage key={Math.random()} content={reply} />]
                })

                // invalidate subscription cache
                queryClient.invalidateQueries("user.subscription")

                // for demo only
                if (isDemo) {
                    setDemoSubscription(prev => {
                        return {
                            ...prev,
                            questions: prev.questions - 1
                        }
                    })
                }
            }
            else {
                toast.error(data.message)
                setChatHistory(chatHistory => {
                    // remove the PlaceholderMessage first, before appending the reply
                    return chatHistory.slice(0, -1)
                })
            }
        }).catch(err => {
            if (err.response?.data?.message)
            {
                toast.warning(err.response?.data?.message)
            }
            else
            {
                toast.error(err.message)
            }

            setChatHistory(chatHistory => {
                // remove the PlaceholderMessage first, before appending the reply
                return chatHistory.slice(0, -1)
            })
        }).finally(() => {
            setSending(false)
            queryClient.invalidateQueries(`user.chat.${uuid}`)
            // scroll down
            scrollToPrompt()
        })
    }, [uuid, prompt])

    const handleStop = useCallback((e) => {

        stopPrompt(uuid).then(req => {
            console.log("prompt stopped")
        }).catch (err => {
            if (err.response.status === 422 || err.response.status === 400) {
                toast.warning(err.response?.data?.message)
            }
            else
            {
                toast.error(err.message)
            }
        }).finally(() => {

        })
        // reset the prompt input
        setSending(false)
        setChatHistory(chatHistory => {
            // remove the PlaceholderMessage
            return chatHistory.slice(0, -1)
        })
    }, [uuid])

    const handleClearChatHistory = useCallback(() => {
        setClearingChatHistory(true)

        clearChatHistory(uuid).then(req => {
            if (req.status === 204)
            {
                toast.success("Cleared successfully.")
                queryClient.invalidateQueries(`user.chat.${uuid}`)
                setChatHistory([DEFAULT_MESSAGE])
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
            <div className="container prompt-input d-flex gap-2 pt-5 pb-4 px-4" ref={promptRef}>
                <form onSubmit={handleSubmit} className="flex-grow-1">
                    <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="form-control form-control-lg" placeholder="Ask anything..." />
                </form>

                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => (
                        <Tooltip id="button-tooltip" {...props}>
                            {isSending ? "Stop" : "Send"}
                        </Tooltip>
                    )}
                >
                    <SuperButton className={["btn btn-lg send", (isSending ? "btn-danger" : "btn-primary")].join(" ")} title={isSending ? "Stop" : "Send"} onClick={(e) => {
                        if (isSending)
                            return handleStop(e)
                        handleSubmit(e)
                    }}>
                        {isSending ? (
                            <FontAwesomeIcon icon={faStop} />
                        ) : (
                            <FontAwesomeIcon icon={faPaperPlane} />
                        )}
                    </SuperButton>
                </OverlayTrigger>

                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={(props) => (
                        <Tooltip id="button-tooltip" {...props}>
                            Clear Chat History
                        </Tooltip>
                    )}
                >
                    <SuperButton className="btn btn-secondary clear-history" isLoading={isClearingChatHistory} title="Clear Chat History" onClick={handleClearChatHistory}><FontAwesomeIcon icon={faTrashCan} /></SuperButton>
                </OverlayTrigger>
            </div>
            <div className="container px-4 mb-2">
                <small>
                    <b>Note:</b> if the chat bot said that he doesn't have access to document or doesn't know where to look up, just tell him "<b><i>from document?</i></b>".
                </small>
            </div>
        </>
    )
}
