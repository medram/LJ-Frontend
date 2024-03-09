import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import SectionSuspense from "@/components/SectionSuspense";
import { deleteChatRoom } from "@api/account";
import { uploadFile } from "@api/index";
import AvatarPalceholder from "@components/AvatarPalceholder";
import Dropzone, { onUploadProps } from "@components/Dropzone";
import SpinnerGrow from "@components/SpinnerGrow";
import TablerIcon from "@components/TablerIcon";
import ChatLabel from "@components/playground/ChatLabel";
import ChatSection from "@components/playground/ChatSection";
import { faBarsStaggered, faChevronRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCurrentSubscription, useUserChatRoomList } from "@hooks/account";
import { useUser } from "@hooks/auth";
import { useDemo, useEventListener, useLCInfo, useNaiveLocalStorage } from "@hooks/index";
import { IconBolt, IconCloudUpload } from "@tabler/icons-react";
import { DEMO_SUBSCRIPTION, DEMO_SUBSCRIPTION_EXPIRE, getAvailableDocumentTypes, getAvailableDocumentTypesString } from "@utils/index";
import { useCallback, useEffect, useState } from "react";
import { FileRejection } from "react-dropzone";
import { Sidebar } from 'react-pro-sidebar';
import { useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


const onUpload = ({
    files,
    setProgress,
    setIsSuccessUpload,
    resetDropzone,
    name,
    createChatRoom,
    setProcessing,
    subscription,
    isDemo,
    demoSubscription,
    setDemoSubscription,
    queryClient
 }: onUploadProps) => {

    if (isDemo && demoSubscription.pdfs <= 0)
    {
        resetDropzone()
        return toast.warning("The demo quota is exceeded, please wait 12 hours 🙏")
    }

    if (!isDemo)
    {
        if (subscription?.status !== 1)
        {
            resetDropzone()
            return toast.warning("You need a valid subscription to continue.")
        }
        else if (subscription?.pdfs <= 0)
        {
            resetDropzone()
            return toast.warning("You have reached the maximum number of document uploads.")
        }
    }

    uploadFile("user/chat", files[0], {
        onUploadProgress: (e) => {
            let perc = e.loaded / e.total * 100
            setProgress(perc)
            if (perc >= 100)
                setProcessing(true)
        }
    }).then((res) => {

        if (res.data && !res.data?.errors)
        {
            const { chat_room } = res.data
            // Create a new chat room
            createChatRoom(chat_room.uuid, chat_room.title)
            setIsSuccessUpload(true)
            // to reset everything in the dropzone
            setTimeout(() => {
                resetDropzone()
            }, 5000)

            // for demo only
            if (isDemo)
            {
                setDemoSubscription(prev => {
                    return {
                        ...prev,
                        pdfs: prev.pdfs - 1
                    }
                })
            }

            // invalidate subscription cache
            queryClient.invalidateQueries("user.subscription")
        }
        else {
            toast.error(res.data?.message)
            resetDropzone()
        }

    }).catch(err => {

        if (err.response.status === 422 || err.response.status == 400) {
            toast.warning(err.response?.data?.message)
        }
        else
        {
            toast.error(err.message)
        }
        resetDropzone()
    }).finally(() => {
        setProcessing(false)
    })

}

const onError = (rejectedFiles: FileRejection[]) => {
    toast.error("Invalid document!")
}


export default function PlaygroundPage()
{
    const { isDemo } = useDemo()
    const { user } = useUser()
    const [ getDemoSubscription, setDemoSubscription ] = useNaiveLocalStorage("demo_sub", DEMO_SUBSCRIPTION)

    const demoSubscription = isDemo ? getDemoSubscription() : null;
    const { isExtendedLicense: isEL } = useLCInfo()

    const [ toggled, setToggled ] = useState(false)
    const [ collapsed, setCollapsed ] = useState(false)
    const [windowInnerWidth, setWindowInnerWidth] = useEventListener('resize', window.innerWidth, () => window.innerWidth)

    const { subscription } = useCurrentSubscription({ suspense: true })

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { uuid } = useParams()
    const [ currentChatRoomUUID, setCurrentChatRoomUUID ] = useState<string | null>(uuid ? uuid : null)

    const { isError, error, userChatRoomList } = useUserChatRoomList()
    const [ isProcessing, setProcessing ] = useState(false)

    useEffect(() => {
        if (uuid && uuid !== currentChatRoomUUID)
            setCurrentChatRoomUUID(uuid)
    }, [currentChatRoomUUID])

    const handleChatLabelClick = useCallback((uuid: string) => {
        setCurrentChatRoomUUID(uuid)
        setToggled(false)
        navigate(`/playground/${uuid}`)
    }, [uuid])

    const createChatRoom = useCallback((uuid: string, title: string) => {
        queryClient.invalidateQueries("user.chat.list")
        setCurrentChatRoomUUID(uuid)
        navigate(`/playground/${uuid}`)
    }, [uuid])

    const handleChatRoomDeletion = useCallback((uuid: string, callback: () => unknown) => {
        let nextUUID: string = ""
        if (userChatRoomList)
        {
            for (const chatroom of userChatRoomList)
            {
                if (chatroom?.uuid !== uuid)
                {
                    nextUUID = chatroom?.uuid
                    break
                }
            }
        }

        deleteChatRoom(uuid).then(req => {
            if (req.status === 204) {
                toast.success("Deleted successfully.")
                queryClient.invalidateQueries("user.chat.list").then(() => {
                    if (nextUUID)
                    {
                        setCurrentChatRoomUUID(nextUUID)
                        navigate(`/playground/${nextUUID}`)
                    }
                })
            }
            else {
                toast.warning("Something went wrong!")
            }
        }).catch(err => {
            toast.error(err)
        }).finally(() => {
            callback()
        })
    }, [uuid, userChatRoomList])

    useEffect(() => {
        if ((!uuid || !currentChatRoomUUID) && userChatRoomList.length) {
            setCurrentChatRoomUUID(userChatRoomList[0]?.uuid)
            navigate(`/playground/${userChatRoomList[0]?.uuid}`)
        }
        else if (userChatRoomList.length === 0)
        {
            setCurrentChatRoomUUID(null)
            navigate(`/playground`)
        }
    }, [uuid, userChatRoomList])

    useEffect(() => {
        if (demoSubscription)
        {
            if (new Date().getTime() - demoSubscription?.created_at > (DEMO_SUBSCRIPTION_EXPIRE * 60 * 60 * 1000)) // 12 hours
            {
                // reset the demo subscription
                setDemoSubscription(DEMO_SUBSCRIPTION)
            }
        }
    }, [])

    if (isError)
    {
        toast.error(error as string)
    }


    return (
        <>
            <main className="playground">
                <Sidebar width="290px" toggled={toggled} collapsed={collapsed} breakPoint="md" onBackdropClick={() => setToggled(!toggled)} backgroundColor="" className="">
                    <div className="playground-sidebar">
                        {(!!userChatRoomList?.length && (subscription || demoSubscription)) && (
                            <Dropzone onUpload={onUpload} onError={onError} name="pdf-file"
                            extraOnUploadProps={{
                                createChatRoom,
                                setProcessing,
                                subscription,
                                isDemo,
                                demoSubscription,
                                setDemoSubscription,
                                queryClient,
                            }} dropzoneOptions={{
                                accept: getAvailableDocumentTypes(),
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
                                            <p>
                                                Drag & Drop your Document<br />
                                                <small>({getAvailableDocumentTypesString()})</small>
                                            </p>
                                        </div>
                                    )
                                )}
                            </Dropzone>
                        )}

                        <div className="chat-labels-list my-3">
                            {userChatRoomList?.map((chat, i) => {
                                let title = chat.title.length <=25 ? chat.title.substring(0, 25) : `${chat.title.substring(0, 25)}...`

                                return <ChatLabel
                                    key={i}
                                    title={title}
                                    onClick={() => handleChatLabelClick(chat.uuid)}
                                    onDelete={(callback: () => void) => handleChatRoomDeletion(chat.uuid, callback)}
                                    active={chat.uuid === currentChatRoomUUID}
                                    />
                            })}
                        </div>

                        <div className="sidebar-bottom-section">
                            {isDemo && (
                                <>
                                    {(subscription && (subscription?.questions <= 20 || subscription?.pdfs <= 10)) && (
                                        <Link to="/pricing" className="btn btn-warning btn-lg btn-block"><TablerIcon icon={IconBolt} stroke={1.5} size={30} /> Upgrade</Link>
                                    )}

                                    <div className="quota">
                                        <small>- Quota limited for demo only.</small><br />
                                        <small>- Quota reset every 12 hours.</small>
                                        <h3 className="h6">Quota:</h3>
                                        <span><b>{demoSubscription?.pdfs}</b> Documents left</span><br />
                                        <span><b>{demoSubscription?.questions}</b> Document Questions left</span><br />
                                        <span>Max Document Size: <b>{subscription?.pdf_size}MB/doc</b></span><br />
                                    </div>
                                </>
                            )}

                            {subscription && isEL && !isDemo && (
                                <>
                                    {(subscription?.questions <= 20 || subscription?.pdfs <= 10) && (
                                        <Link to="/pricing" className="btn btn-warning btn-lg btn-block"><TablerIcon icon={IconBolt} stroke={1.5} size={30} /> Upgrade</Link>
                                    )}

                                    <div className="quota">
                                        <h3 className="h6">Available Subscription Quota:</h3>
                                        <span><b>{subscription?.pdfs}</b> Documents left.</span><br />
                                        <span><b>{subscription?.questions}</b> Document Questions left.</span><br />
                                        <span>Max Document Size: <b>{subscription?.pdf_size}MB/doc.</b></span><br />
                                    </div>
                                </>
                            )}
                            {user && (
                                <div className="profile" onClick={() => navigate("/account/settings")}>
                                    <AvatarPalceholder username={user.username} size={45} />
                                    <div>
                                        <b>{user.username}</b><br />
                                        <span>({user.email})</span>
                                    </div>
                                    <div className="">
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                </Sidebar>

                <section className="playground-chat-section">
                    {windowInnerWidth <= 768 && (
                        <button type="button" onClick={() => setToggled(toggled => !toggled)} className="btn btn-light toggle-sidebar-button text-primary"><FontAwesomeIcon icon={faBarsStaggered} /> Chats</button>
                    )}

                    <section className="d-flex flex-column">
                        {isEL ? (
                            (subscription && (subscription?.status == 1 || isDemo)) ? (
                                subscription?.questions <= 0 ? (
                                    <div className="d-flex flex-column justify-content-start p-5">
                                        Your subscription has reached its maximum usage.
                                        <Link to="/pricing" className="btn btn-warning my-3">Upgrade Now?</Link>
                                    </div>
                                ) : (
                                    currentChatRoomUUID && (
                                        <SectionErrorBoundary key={currentChatRoomUUID}>
                                            <SectionSuspense>
                                                <ChatSection uuid={currentChatRoomUUID} key={currentChatRoomUUID} />
                                            </SectionSuspense>
                                        </SectionErrorBoundary>
                                    )
                                )
                            ) : (
                                <div className="d-flex flex-column justify-content-start p-5 mt-3">
                                    You need to have a subscription in order to be able to use the Playground section.
                                    <Link to="/pricing" className="btn btn-warning my-3">Get a subscription now?</Link>
                                </div>
                            )
                        ) : (
                            currentChatRoomUUID && (
                                <SectionErrorBoundary key={currentChatRoomUUID}>
                                    <SectionSuspense>
                                        <ChatSection uuid={currentChatRoomUUID} key={currentChatRoomUUID} />
                                    </SectionSuspense>
                                </SectionErrorBoundary>
                            )
                        )}

                        {!currentChatRoomUUID && (
                            <div className="d-flex justify-content-center align-items-center h-100" >
                                <div className="w-50">
                                    {(subscription || demoSubscription) && (
                                        <div className="text-center">
                                            <h3>Upload your Document to chat with.</h3>
                                            <Dropzone onUpload={onUpload} onError={onError} name="pdf-file"
                                                extraOnUploadProps={{
                                                    createChatRoom,
                                                    setProcessing,
                                                    subscription,
                                                    isDemo,
                                                    demoSubscription,
                                                    setDemoSubscription,
                                                    queryClient,
                                                }} dropzoneOptions={{
                                                    accept: getAvailableDocumentTypes(),
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
                                                            <b><TablerIcon icon={IconCloudUpload} size={40} /><br />
                                                                Upload you Document<br />
                                                                ({getAvailableDocumentTypesString()})
                                                            </b>
                                                            <p>(Drag & Drop)</p>
                                                        </div>
                                                    )
                                                )}
                                            </Dropzone>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>
                </section>
            </main>
        </>
    )
}
