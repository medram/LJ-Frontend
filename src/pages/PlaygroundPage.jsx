import { faBarsStaggered, faGem, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropzone from "../components/Dropzone"
import { Sidebar } from 'react-pro-sidebar';
import { useCallback, useEffect, useState } from "react";
import { useDemo, useEventListener, useLCInfo, useNaiveLocalStorage } from "../hooks";
import AvatarPalceholder from "../components/AvatarPalceholder";
import ChatLabel from "../components/playground/ChatLabel";
import ChatSection from "../components/playground/ChatSection";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../hooks/auth";
import FullscreenLoading from "../components/FullscreenLoading";
import { useCurrentSubscription, useUserChatRoomList } from "../hooks/account";
import { toast } from "react-toastify";
import { uploadFile } from "../api";
import { useQueryClient } from "react-query";
import SpinnerGrow from "../components/SpinnerGrow";
import { deleteChatRoom } from "../api/account";


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
 }) => {

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

const onError = (rejectedFiles) => {
    toast.error("Invalid document!")
}


export default function PlaygroundPage()
{
    const { isDemo } = useDemo()
    const [ getDemoSubscription, setDemoSubscription ] = useNaiveLocalStorage("demo_sub", {
        pdfs: 2,
        questions: 10,
        created_at: new Date().getTime()
    })

    const demoSubscription = getDemoSubscription()
    const { isExtendedLicense: isEL } = useLCInfo()

    const [ toggled, setToggled ] = useState(false)
    const [ collapsed, setCollapsed ] = useState(false)
    const [windowInnerWidth, setWindowInnerWidth] = useEventListener('resize', window.innerWidth, () => window.innerWidth)

    const { user } = useUser()
    const { isLoading: isSubscriptionLoading, subscription } = useCurrentSubscription()

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { uuid } = useParams()
    const [ currentChatRoomUUID, setCurrentChatRoomUUID ] = useState(uuid)

    const { isLoading, isError, error, userChatRoomList } = useUserChatRoomList()
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

    const handleChatRoomDeletion = useCallback((uuid, callback) => {

        deleteChatRoom(uuid).then(req => {
            if (req.status === 204) {
                queryClient.invalidateQueries("user.chat.list")
                toast.success("Deleted successfully.")
            }
            else {
                toast.warning("Something went wrong!")
            }
        }).catch(err => {
            toast.error(err)
        }).finally(() => {
            callback()
        })
    }, [uuid])

    useEffect(() => {
        if ((!uuid || !currentChatRoomUUID) && userChatRoomList !== undefined && Object.keys(userChatRoomList).length) {
            // return <Navigate to={`/playground/${userChatRoomList[0]?.uuid}`} replace={true} />
            navigate(`/playground/${userChatRoomList[0]?.uuid}`)
            setCurrentChatRoomUUID(userChatRoomList[0]?.uuid)
        }
        else if (userChatRoomList !== undefined && !Object.keys(userChatRoomList).length)
        {
            setCurrentChatRoomUUID("")
            navigate(`/playground`)
        }
    }, [uuid, userChatRoomList])

    useEffect(() => {
        if (new Date().getTime() - demoSubscription.created_at > (12 * 60 * 60 * 1000)) // 12 hours
        {
            // reset the demo subscription
            setDemoSubscription({
                pdfs: 2,
                questions: 10,
                created_at: new Date().getTime()
            })
        }
    }, [])

    if (isError)
    {
        toast.error(error)
    }

    if (!Object.keys(user).length || isLoading || isSubscriptionLoading)
    {
        return <FullscreenLoading />
    }


    return (
        <>
            <main className="playground">
                <Sidebar toggled={toggled} collapsed={collapsed} breakPoint="md" onBackdropClick={() => setToggled(!toggled)} backgroundColor="" className="">
                    <div className="playground-sidebar">
                        {(subscription || demoSubscription) && (
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
                        )}

                        <div className="chat-labels-list my-3">
                            {userChatRoomList?.map((chat, i) => {
                                return <ChatLabel
                                    key={i}
                                    title={chat.title}
                                    onClick={() => handleChatLabelClick(chat.uuid)}
                                    onDelete={(callback) => handleChatRoomDeletion(chat.uuid, callback)}
                                    active={chat.uuid === currentChatRoomUUID}
                                    />
                            })}
                        </div>

                        <div className="sidebar-bottom-section">
                            {isDemo && (
                                <>
                                    {(subscription?.questions <= 20 || subscription?.pdfs <= 10) && (
                                        <Link to="/account/settings/subscription" className="btn btn-warning btn-lg btn-block"><FontAwesomeIcon icon={faGem} /> Upgrade</Link>
                                    )}

                                    <div className="quota">
                                        <small>- Quota limited for demo only.</small><br />
                                        <small>- Quota reset every 12 hours.</small>
                                        <h3 className="h6">Quota:</h3>
                                        <span>{demoSubscription?.pdfs} PDFs</span><br />
                                        <span>Max PDF size: {subscription?.pdf_size}MB/pdf</span><br />
                                        <span>{demoSubscription?.questions} PDF Questions</span><br />
                                    </div>
                                </>
                            )}

                            {subscription && isEL && !isDemo && (
                                <>
                                    {(subscription?.questions <= 20 || subscription?.pdfs <= 10) && (
                                        <Link to="/account/settings/subscription" className="btn btn-warning btn-lg btn-block"><FontAwesomeIcon icon={faGem} /> Upgrade</Link>
                                    )}

                                    <div className="quota">
                                        <h3 className="h6">Quota:</h3>
                                        <span>{subscription?.pdfs} PDFs</span><br />
                                        <span>Max PDF size: {subscription?.pdf_size}MB/pdf</span><br />
                                        <span>{subscription?.questions} PDF Questions</span><br />
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
                                </div>
                            )}

                            <footer>
                                <Link to="/">Home</Link>
                                {isEL && (
                                    <Link to="/pricing">Pricing</Link>
                                )}
                                <Link to="/contact">Contact us</Link>
                            </footer>

                        </div>
                    </div>

                </Sidebar>

                <section className="playground-chat-section">
                    {windowInnerWidth <= 768 && (
                        <button type="button" onClick={() => setToggled(toggled => !toggled)} className="btn btn-light toggle-sidebar-button text-primary"><FontAwesomeIcon icon={faBarsStaggered} /></button>
                    )}

                    <section className="d-flex flex-column">
                        {isEL ? (
                            (subscription && subscription?.status == 1 || isDemo) ? (
                                subscription?.questions <= 0 ? (
                                    <div className="d-flex flex-column justify-content-start p-5">
                                        Your subscription has reached its maximum usage.
                                        <Link to="/pricing" className="btn btn-warning my-3">Upgrade Now?</Link>
                                    </div>
                                ) : (
                                    currentChatRoomUUID && (
                                        <ChatSection uuid={currentChatRoomUUID} key={uuid} />
                                    )
                                )
                            ) : (
                                <div className="d-flex flex-column justify-content-start p-5">
                                    You need to have a subscription in order to be able to use the Playground section.
                                    <Link to="/pricing" className="btn btn-warning my-3">Get a subscription now?</Link>
                                </div>
                            )
                        ) : (
                            currentChatRoomUUID && (
                                <ChatSection uuid={currentChatRoomUUID} key={uuid} />
                            )
                        )}
                    </section>
                </section>
            </main>
        </>
    )
}
