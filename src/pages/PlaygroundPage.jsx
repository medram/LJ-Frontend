import { faBarsStaggered, faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuperButton from "../components/SuperButton";
import UserMessage from "../components/playground/UserMessage";
import AIMessage from "../components/playground/AIMessage";
import Dropzone from "../components/Dropzone"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useEffect, useState } from "react";
import { useEventListener } from "../hooks";
import AvatarPalceholder from "../components/AvatarPalceholder";
import ChatLabel from "../components/playground/ChatLabel";
import ChatSection from "../components/playground/ChatSection";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../hooks/auth";
import SectionLoading from "../components/SectionLoading";
import FullscreenLoading from "../components/FullscreenLoading";
import { useUserChatRoomList } from "../hooks/account";


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

    const navigate = useNavigate()
    const { uuid } = useParams()
    const [ currentChatRoomUUID, setCurrentChatRoomUUID ] = useState(uuid)

    const { isLoading, userChatRoomList } = useUserChatRoomList()

    const handleChatLabelClick = (uuid) => {
        setCurrentChatRoomUUID(uuid)
        navigate(`/playground/${uuid}`)
    }


    if (!Object.keys(user).length || isLoading || !Object.keys(userChatRoomList).length)
    {
        return <FullscreenLoading />
    }
    else if (!uuid)
    {
        return <Navigate to={`/playground/${userChatRoomList[0]?.uuid}`} replace={true} />
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
                            {userChatRoomList?.map((chat, i) => {
                                return <ChatLabel key={i} title={chat.title} onClick={() => handleChatLabelClick(chat.uuid)} />
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
                        <ChatSection uuid={currentChatRoomUUID} key={uuid} />
                    </section>
                </section>
            </main>
        </>
    )
}
