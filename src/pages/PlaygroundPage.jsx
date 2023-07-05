import { faBarsStaggered, faPaperPlane, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuperButton from "../components/SuperButton";
import UserMessage from "../components/playground/UserMessage";
import AIMessage from "../components/playground/AIMessage";
import Dropzone from "../components/Dropzone"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useCallback, useEffect, useState } from "react";
import { useEventListener } from "../hooks";
import AvatarPalceholder from "../components/AvatarPalceholder";
import ChatLabel from "../components/playground/ChatLabel";
import ChatSection from "../components/playground/ChatSection";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../hooks/auth";
import FullscreenLoading from "../components/FullscreenLoading";
import { useUserChatRoomList } from "../hooks/account";
import { toast } from "react-toastify";
import { uploadFile } from "../api";
import { useQueryClient } from "react-query";
import SpinnerGrow from "../components/SpinnerGrow";


const onUpload = ({ files, setProgress, setIsSuccessUpload, resetDropzone, name, createChatRoom, setProcessing }) => {
    uploadFile("user/chat", files[0], {
        onUploadProgress: (e) => {
            let perc = e.loaded / e.total * 100
            setProgress(perc)
            if (perc >= 100)
                setProcessing(true)
        }
    }).then((res) => {
        if (res.data && !res.data?.errors) {
            const { chat_room } = res.data
            // Create a new chat room
            createChatRoom(chat_room.uuid, chat_room.title)
            setIsSuccessUpload(true)
            // to reset everything in the dropzone
            setTimeout(() => {
                resetDropzone()
            }, 5000)
        }
        else {
            toast.error(res.data?.message)
            resetDropzone()
        }
        setProcessing(false)
    }).catch(err => {
        toast.error(err.message)
        setProcessing(false)
        resetDropzone()
    })

}

const onError = (rejectedFiles) => {
    toast.error("Invalid document!")
}


export default function PlaygroundPage()
{
    const [ toggled, setToggled ] = useState(false)
    const [ collapsed, setCollapsed ] = useState(false)
    const [windowInnerWidth, setWindowInnerWidth] = useEventListener('resize', window.innerWidth, () => window.innerWidth)

    const { user } = useUser()

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { uuid } = useParams()
    const [ currentChatRoomUUID, setCurrentChatRoomUUID ] = useState(uuid)

    const { isLoading, userChatRoomList } = useUserChatRoomList()
    const [ isProcessing, setProcessing ] = useState(false)


    const handleChatLabelClick = useCallback((uuid) => {
        setCurrentChatRoomUUID(uuid)
        navigate(`/playground/${uuid}`)
    }, [uuid])

    const createChatRoom = useCallback((uuid, title) => {
        queryClient.invalidateQueries("user.chat.list")
        setCurrentChatRoomUUID(uuid)
        navigate(`/playground/${uuid}`)
    }, [uuid])

    useEffect(() => {
        if ((!uuid || !currentChatRoomUUID) && userChatRoomList !== undefined && Object.keys(userChatRoomList).length) {
            // return <Navigate to={`/playground/${userChatRoomList[0]?.uuid}`} replace={true} />
            navigate(`/playground/${userChatRoomList[0]?.uuid}`)
            setCurrentChatRoomUUID(userChatRoomList[0]?.uuid)
        }
    }, [uuid, userChatRoomList])

    if (!Object.keys(user).length || isLoading)
    {
        return <FullscreenLoading />
    }


    return (
        <>
            <main className="playground">
                <Sidebar toggled={toggled} collapsed={collapsed} breakPoint="md" onBackdropClick={() => setToggled(!toggled)} backgroundColor="" className="">
                    <div className="playground-sidebar">
                        <Dropzone onUpload={onUpload} onError={onError} name="pdf-file"
                        extraOnUploadProps={{
                            createChatRoom,
                            setProcessing
                        }} dropzoneOptions={{
                            accept: { 'application/pdf': ['.pdf'] },
                            maxSize: 50 * 1024 * 1024, // (in bytes) 50 MB
                        }} >
                            {isProcessing ? (
                                <div className="text-center">
                                    <b><SpinnerGrow size="sm" /> Processing...</b>
                                </div>
                            ) : (
                                collapsed ? (
                                    <FontAwesomeIcon icon={faPlus} />
                                ) : (
                                    <div className="text-center">
                                        <b><FontAwesomeIcon icon={faPlus} /> New Chat</b>
                                        <p>Drag & Drop your PDF</p>
                                    </div>
                                )
                            )}
                        </Dropzone>

                        <div className="chat-labels-list">
                            {userChatRoomList?.map((chat, i) => {
                                return <ChatLabel key={i} title={chat.title} onClick={() => handleChatLabelClick(chat.uuid)} active={chat.uuid === currentChatRoomUUID} />
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
                        {currentChatRoomUUID && (
                            <ChatSection uuid={currentChatRoomUUID} key={uuid} />
                        )}
                    </section>
                </section>
            </main>
        </>
    )
}
