import { faBarsStaggered, faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuperButton from "../components/SuperButton";
import UserMessage from "../components/playground/UserMessage";
import AIMessage from "../components/playground/AIMessage";
import ChatSection from "../components/playground/ChatSection";
import Dropzone from "../components/Dropzone"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useState } from "react";
import { useEventListener } from "../hooks";


const onUpload = () => {

}

const onError = () => {

}


export default function PlaygroundPage()
{
    const [ toggled, setToggled ] = useState(false)
    const [ collapsed, setCollapsed ] = useState(false)
    const [windowInnerWidth, setWindowInnerWidth] = useEventListener('resize', window.innerWidth, () => window.innerWidth)



    return (
        <>
            <main className="playground">
                <Sidebar toggled={toggled} collapsed={collapsed} breakPoint="md" onBackdropClick={() => setToggled(!toggled)} backgroundColor="" className="">
                    <div className="playground-sidebar">
                        <Dropzone onUpload={onUpload} onError={onError} name="pdf-file" dropzoneOptions={{
                            accept: { 'application/pdf': ['.pdf'] },
                            maxSize: 50 * 1024 * 1024, // (in bytes) 50 MB
                        }} >
                            {collapsed ? (
                                <FontAwesomeIcon icon={faPlus} />
                            ) : (
                                <div className="text-center">
                                    <b><FontAwesomeIcon icon={faPlus} /> New Chat</b>
                                    <p>Drag & Drop your PDF</p>
                                </div>
                            )}
                        </Dropzone>

                        <div className="chat-labels-list">
                            <ChatSection title="Math.pdf" />
                            <ChatSection title="Science-of-rockts.pdf" />
                        </div>

                        <div className="sidebar-buttom-section">
                            <div>
                                Subscription quata:<br />
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit totam, sint non enim corporis ipsam ipsum beatae commodi ab, dolorem accusamus? Saepe repellendus quis similique molestiae obcaecati ipsa nobis velit!
                            </div>
                            <div>
                                Admin (admin@test.com)
                            </div>
                        </div>
                    </div>

                </Sidebar>

                <section className="playground-chat-section">
                    {windowInnerWidth <= 768 && (
                        <button type="button" onClick={() => setToggled(toggled => !toggled)} className="btn btn-light toggle-sidebar-button text-primary"><FontAwesomeIcon icon={faBarsStaggered} /></button>
                    )}

                    <section className="d-flex flex-column">
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
                            <SuperButton className="btn btn-primary btn-lg" onClick={() => {}}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </SuperButton>
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}
