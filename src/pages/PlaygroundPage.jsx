import { faBarsStaggered, faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuperButton from "../components/SuperButton";
import UserMessage from "../components/playground/UserMessage";
import AIMessage from "../components/playground/AIMessage";
import Dropzone from "../components/Dropzone"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useState } from "react";
import { useEventListener } from "../hooks";
import AvatarPalceholder from "../components/AvatarPalceholder";
import ChatLabel from "../components/playground/ChatLabel";
import ChatSection from "../components/playground/ChatSection";
import { useParams } from "react-router-dom";
import { useUser } from "../hooks/auth";
import SectionLoading from "../components/SectionLoading";
import FullscreenLoading from "../components/FullscreenLoading";


const onUpload = () => {

}

const onError = () => {

}


export default function PlaygroundPage()
{
    const [ toggled, setToggled ] = useState(false)
    const [ collapsed, setCollapsed ] = useState(false)
    const [windowInnerWidth, setWindowInnerWidth] = useEventListener('resize', window.innerWidth, () => window.innerWidth)

    const { user } = useUser()

    const { uuid } = useParams()
    const [ currentChatSectionUUID, setCurrentChatSectionUUID ] = useState(uuid)

    const [ chatLabelList, setChatLabelList ] = useState([
        { title: "Math.pdf", "uuid": "qsdflkjsdflkqsdflkqsjdfkqsdlkdk"},
        { title: "Science-of-rockts.pdf", "uuid": "qsdflkjsdlkqsdflkqsjdfkqsdqsdqsdq"},
        { title: "Science-of-rockts.pdf", "uuid": "qsdflkjsdlkqsdflkqsjdfkqsdqsdqsdq"},
        { title: "Science-of-rockts.pdf", "uuid": "qsdflkjsdlkqsdflkqsjdfkqsdqsdqsdq"},
        { title: "Science-of-rockts.pdf", "uuid": "qsdflkjsdlkqsdflkqsjdfkqsdqsdqsdq"},
    ])


    if (!Object.keys(user).length)
    {
        return <FullscreenLoading />
    }


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
                            {chatLabelList.map((chatLabel, i) => {
                                return <ChatLabel key={i} title={chatLabel.title} onClick={() => setCurrentChatSectionUUID(chatLabel.uuid)} />
                            })}
                        </div>

                        <div className="sidebar-bottom-section">
                            <div className="quota">
                                <h3 className="h6">Quota:</h3>
                                <span>10 PDFs</span><br />
                                <span>100 pages/pdf (max)</span><br />
                                <span>Max PDF size: 10MB/pdf</span><br />
                                <span>30 PDF Questions</span><br />
                            </div>
                            {user && (
                                <div className="profile">
                                    <AvatarPalceholder username={user.username} size={45} />
                                    <div>
                                        <b>{user.username}</b><br />
                                        <span>({user.email})</span>
                                    </div>
                                </div>
                            )}

                            <footer>
                                <a href="/">Home</a>
                                <a href="/pricing">Pricing</a>
                                <a href="/contact">Contact us</a>
                                <a href="/api">API access</a>
                            </footer>

                        </div>
                    </div>

                </Sidebar>

                <section className="playground-chat-section">
                    {windowInnerWidth <= 768 && (
                        <button type="button" onClick={() => setToggled(toggled => !toggled)} className="btn btn-light toggle-sidebar-button text-primary"><FontAwesomeIcon icon={faBarsStaggered} /></button>
                    )}

                    <section className="d-flex flex-column">
                        <ChatSection uuid={currentChatSectionUUID} />
                    </section>
                </section>
            </main>
        </>
    )
}
