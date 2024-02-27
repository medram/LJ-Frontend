
import { DEMO_SUBSCRIPTION } from "@/utils";
import { ChatMessage, ChatMessageType } from "@/utils/types";
import { clearChatHistory, sendPrompt, stopPrompt } from "@api/account";
import SuperButton from "@components/SuperButton";
import TablerIcon from "@components/TablerIcon";
import useChatRoom from "@hooks/account";
import { useDemo, useNaiveLocalStorage, useScrollToRef } from "@hooks/index";
import { IconPlayerStopFilled, IconSend, IconTrash } from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import AIMessage from "./AIMessage";
import PlaceholderMessage from "./PlaceholderMessage";
import UserMessage from "./UserMessage";


export default function ChatSection({ uuid }: { uuid: string })
{
    const { isDemo } = useDemo()
    const [getDemoSubscription, setDemoSubscription] = useNaiveLocalStorage("demo_sub", DEMO_SUBSCRIPTION)
    const demoSubscription = getDemoSubscription()

    const queryClient = useQueryClient()
    const { isError, error, chat } = useChatRoom(uuid)
    const [ chatHistory, setChatHistory ] = useState<ChatMessage[]>([])
    const [ prompt, setPrompt ] = useState("")
    const [ isSending, setSending ] = useState(false)
    const [isClearingChatHistory, setClearingChatHistory ] = useState(false)
    const [promptRef, scrollToPrompt] = useScrollToRef<HTMLDivElement>()

    useEffect(() => {
        if (chat)
        {
            let messages: ChatMessage[] = []
            chat.chat_history.map((message: ChatMessageType, i: number) => {
                if (message.type === "ai")
                    messages.push(<AIMessage key={i} content={message.content} />)
                else
                    messages.push(<UserMessage key={i} content={message.content} />)
            })

            setChatHistory(messages)
        }
        else
        {
            setChatHistory([])
        }

        scrollToPrompt()
    }, [chat])

    useEffect(() => {
        scrollToPrompt()
    }, [])


    const handleSubmit = useCallback((e: any) => {
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
                const reply: string = data?.response?.output?.trim() as string

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

    const handleStop = useCallback((e: any) => {

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

    if (isError)
    {
        toast.error(error as string)
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
                    <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} className="form-control form-control-lg" placeholder="Ask your document a question?" />
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
                    <SuperButton disabled={!prompt && !isSending} className={["btn btn-sm send", (isSending ? "btn-danger" : "btn-primary")].join(" ")} title={isSending ? "Stop" : "Send"} onClick={(e: any) => {
                        if (isSending)
                            return handleStop(e)
                        handleSubmit(e)
                    }}>
                        {isSending ? (
                            <TablerIcon icon={IconPlayerStopFilled} />
                        ) : (
                            <TablerIcon icon={IconSend} />
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
                    <SuperButton className="btn btn-outline-secondary clear-history" isLoading={isClearingChatHistory} title="Clear Chat History" onClick={handleClearChatHistory}><TablerIcon icon={IconTrash} /></SuperButton>
                </OverlayTrigger>
            </div>
        </>
    )
}
