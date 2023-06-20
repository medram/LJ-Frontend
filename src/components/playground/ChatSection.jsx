import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuperButton from "../SuperButton";
import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";


export default function ChatSection({ uuid })
{
    return (
        <>
            <div className="chats flex-grow-1">
                <div className="container px-4">
                    <UserMessage content="Hello" />
                    <AIMessage content="Hello, How can I help you?" />

                    <UserMessage content="Hello" />
                    <AIMessage content="Hello, How can I help you?" />

                    <UserMessage content="Hello" />
                    <AIMessage content="Hello, How can I help you?" />

                    <UserMessage content="Hello" />
                    <AIMessage content="Hello, How can I help you?" />
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
