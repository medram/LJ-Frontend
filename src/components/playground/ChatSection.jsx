import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuperButton from "../SuperButton";
import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import SectionLoading from "../SectionLoading";
import useChatRoom from "../../hooks/account";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";


export default function ChatSection({ uuid })
{
    // const { uuid } = useParams()
    const { isLoading, isError, error, chat } = useChatRoom(uuid)
    const [ chatHistory, setChatHistory ] = useState([])

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
    }, [isLoading, chat])

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
            <div className="chats flex-grow-1">
                <div className="container px-4">
                    {chatHistory.map((message, i) => message)}
                </div>
            </div>
            <div className="container prompt-input d-flex gap-2 pt-5 pb-5 px-4">
                <input type="text" className="form-control form-control-lg" placeholder="Ask anything..." />
                <SuperButton className="btn btn-primary btn-lg" onClick={() => { }}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </SuperButton>
            </div>
        </>
    )
}
