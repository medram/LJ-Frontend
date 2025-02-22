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
import {
  faBarsStaggered,
  faChevronRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCurrentSubscription, useUserChatRoomList } from "@hooks/account";
import { useUser } from "@hooks/auth";
import {
  useDemo,
  useEventListener,
  useLCInfo,
  useNaiveLocalStorage,
} from "@hooks/index";
import { IconBolt, IconCloudUpload } from "@tabler/icons-react";
import {
  DEMO_SUBSCRIPTION,
  DEMO_SUBSCRIPTION_EXPIRE,
  getAvailableDocumentTypes,
  getAvailableDocumentTypesString,
} from "@utils/index";
import { useCallback, useEffect, useState } from "react";
import { FileRejection } from "react-dropzone";
import { Sidebar } from "react-pro-sidebar";
import { QueryClient, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface DemoSubscription {
  pdfs: number;
  questions: number;
  created_at: number;
}

interface Subscription {
  status: number;
  pdfs: number;
  pdf_size: number;
  questions: number;
}

interface ExtraUploadProps {
  createChatRoom: (uuid: string, title: string) => void;
  setProcessing: (value: boolean) => void;
  subscription: Subscription;
  isDemo: boolean;
  demoSubscription: DemoSubscription;
  setDemoSubscription: (
    updater: (prev: DemoSubscription) => DemoSubscription
  ) => void;
  queryClient: QueryClient;
}

const onUpload = (props: onUploadProps<ExtraUploadProps>) => {
  const {
    files,
    setProgress,
    setIsSuccessUpload,
    resetDropzone,
    createChatRoom,
    setProcessing,
    subscription,
    isDemo,
    demoSubscription,
    setDemoSubscription,
    queryClient,
  } = props;

  if (isDemo && demoSubscription.pdfs <= 0) {
    resetDropzone();
    return toast.warning("The demo quota is exceeded, please wait 12 hours 🙏");
  }

  if (!isDemo) {
    if (subscription?.status !== 1) {
      resetDropzone();
      return toast.warning("You need a valid subscription to continue.");
    } else if (subscription?.pdfs <= 0) {
      resetDropzone();
      return toast.warning(
        "You have reached the maximum number of document uploads."
      );
    }
  }

  if (!files || !files.length) return;

  uploadFile("user/chat", files[0], {
    onUploadProgress: (e) => {
      const total = e.total || 0;
      let perc = (e.loaded / total) * 100;
      setProgress(perc);
      if (perc >= 100) setProcessing(true);
    },
  })
    .then((res) => {
      if (res.data && !res.data?.errors) {
        const { chat_room } = res.data;
        // Create a new chat room
        createChatRoom(chat_room.uuid, chat_room.title);
        setIsSuccessUpload(true);
        // to reset everything in the dropzone
        setTimeout(() => {
          resetDropzone();
        }, 5000);

        // for demo only
        if (isDemo) {
          setDemoSubscription((prev: DemoSubscription) => {
            return {
              ...prev,
              pdfs: prev.pdfs - 1,
            };
          });
        }

        // invalidate subscription cache
        queryClient.invalidateQueries("user.subscription");
      } else {
        toast.error(res.data?.message);
        resetDropzone();
      }
    })
    .catch((err) => {
      if (err.response.status === 422 || err.response.status == 400) {
        toast.warning(err.response?.data?.message);
      } else {
        toast.error(err.message);
      }
      resetDropzone();
    })
    .finally(() => {
      setProcessing(false);
    });
};

const onError = (rejectedFiles: readonly FileRejection[]) => {
  toast.error("Invalid document!");
};

export default function PlaygroundPage() {
  const { isDemo } = useDemo();
  const { user } = useUser();
  const [getDemoSubscription, setDemoSubscription] =
    useNaiveLocalStorage<DemoSubscription>("demo_sub", DEMO_SUBSCRIPTION);

  const demoSubscription = isDemo ? getDemoSubscription() : null;
  const { isExtendedLicense: isEL } = useLCInfo();

  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [windowInnerWidth, setWindowInnerWidth] = useEventListener(
    "resize",
    window.innerWidth,
    () => window.innerWidth
  );

  const { subscription } = useCurrentSubscription({ suspense: true });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [currentChatRoomUUID, setCurrentChatRoomUUID] = useState<string | null>(
    uuid ?? null
  );

  const { isError, error, userChatRoomList } = useUserChatRoomList();
  const [isProcessing, setProcessing] = useState(false);

  useEffect(() => {
    if (uuid && uuid !== currentChatRoomUUID) setCurrentChatRoomUUID(uuid);
  }, [currentChatRoomUUID, uuid]);

  const handleChatLabelClick = useCallback(
    (uuid: string) => {
      setCurrentChatRoomUUID(uuid);
      setToggled(false);
      navigate(`/playground/${uuid}`);
    },
    [navigate]
  );

  const createChatRoom = useCallback(
    (uuid: string, title: string) => {
      queryClient.invalidateQueries("user.chat.list");
      setCurrentChatRoomUUID(uuid);
      navigate(`/playground/${uuid}`);
    },
    [navigate, queryClient]
  );

  const handleChatRoomDeletion = useCallback(
    (uuid: string, callback: () => void) => {
      let nextUUID: string = "";
      if (userChatRoomList) {
        for (const chatroom of userChatRoomList) {
          if (chatroom?.uuid !== uuid) {
            nextUUID = chatroom?.uuid;
            break;
          }
        }
      }

      deleteChatRoom(uuid)
        .then((req) => {
          if (req.status === 204) {
            toast.success("Deleted successfully.");
            queryClient.invalidateQueries("user.chat.list").then(() => {
              if (nextUUID) {
                setCurrentChatRoomUUID(nextUUID);
                navigate(`/playground/${nextUUID}`);
              }
            });
          } else {
            toast.warning("Something went wrong!");
          }
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => {
          callback();
        });
    },
    [navigate, queryClient, userChatRoomList]
  );

  useEffect(() => {
    if ((!uuid || !currentChatRoomUUID) && userChatRoomList.length) {
      setCurrentChatRoomUUID(userChatRoomList[0]?.uuid);
      navigate(`/playground/${userChatRoomList[0]?.uuid}`);
    } else if (userChatRoomList.length === 0) {
      setCurrentChatRoomUUID(null);
      navigate("/playground");
    }
  }, [uuid, userChatRoomList, navigate]);

  useEffect(() => {
    if (demoSubscription) {
      if (
        new Date().getTime() - demoSubscription?.created_at >
        DEMO_SUBSCRIPTION_EXPIRE * 60 * 60 * 1000
      ) {
        // 12 hours
        // reset the demo subscription
        setDemoSubscription(DEMO_SUBSCRIPTION);
      }
    }
  }, [demoSubscription, setDemoSubscription]);

  if (isError) {
    toast.error(error as string);
  }

  return (
    <>
      <main className="playground">
        <Sidebar
          width="290px"
          toggled={toggled}
          collapsed={collapsed}
          breakPoint="md"
          onBackdropClick={() => setToggled(!toggled)}
          backgroundColor="transparent"
          className="playground-sidebar-wrapper"
        >
          <div className="playground-sidebar">
            {!!userChatRoomList?.length &&
              (subscription || demoSubscription) && (
                <Dropzone
                  onUpload={onUpload}
                  onError={onError}
                  name="pdf-file"
                  extraOnUploadProps={{
                    createChatRoom,
                    setProcessing,
                    subscription: subscription as Subscription,
                    isDemo,
                    demoSubscription: demoSubscription as DemoSubscription,
                    setDemoSubscription,
                    queryClient,
                  }}
                  dropzoneOptions={{
                    accept: getAvailableDocumentTypes(),
                    maxSize: 50 * 1024 * 1024, // (in bytes) 50 MB
                  }}
                >
                  {isProcessing ? (
                    <div className="text-center">
                      <b>
                        <SpinnerGrow size="sm" /> Processing...
                      </b>
                    </div>
                  ) : collapsed ? (
                    <FontAwesomeIcon icon={faPlus} />
                  ) : (
                    <div className="text-center">
                      <b>
                        <FontAwesomeIcon icon={faPlus} /> New Chat
                      </b>
                      <p>
                        Drag & Drop your Document
                        <br />
                        <small>({getAvailableDocumentTypesString()})</small>
                      </p>
                    </div>
                  )}
                </Dropzone>
              )}

            <div className="chat-labels-list my-3">
              {userChatRoomList?.map((chat, i) => {
                const title =
                  chat.title.length <= 25
                    ? chat.title.substring(0, 25)
                    : `${chat.title.substring(0, 25)}...`;

                return (
                  <ChatLabel
                    key={i}
                    title={title}
                    onClick={() => handleChatLabelClick(chat.uuid)}
                    onDelete={(callback: () => void) =>
                      handleChatRoomDeletion(chat.uuid, callback)
                    }
                    active={chat.uuid === currentChatRoomUUID}
                  />
                );
              })}
            </div>

            <div className="sidebar-bottom-section">
              {isDemo && (
                <>
                  {subscription &&
                    (subscription?.questions <= 20 ||
                      subscription?.pdfs <= 10) && (
                      <Link
                        to="/pricing"
                        className="btn btn-warning btn-lg btn-block"
                      >
                        <TablerIcon icon={IconBolt} stroke={1.5} size={30} />{" "}
                        Upgrade
                      </Link>
                    )}

                  <div className="quota">
                    <small>- Quota limited for demo only.</small>
                    <small>- Quota reset every 12 hours.</small>
                    <h3 className="h6">Quota:</h3>
                    <span>
                      <b>{demoSubscription?.pdfs}</b> Documents left
                    </span>
                    <span>
                      <b>{demoSubscription?.questions}</b> Document Questions
                      left
                    </span>
                    <span>
                      Max Document Size: <b>{subscription?.pdf_size}MB/doc</b>
                    </span>
                  </div>
                </>
              )}

              {subscription && isEL && !isDemo && (
                <>
                  {(subscription?.questions <= 20 ||
                    subscription?.pdfs <= 10) && (
                    <Link
                      to="/pricing"
                      className="btn btn-warning btn-lg btn-block"
                    >
                      <TablerIcon icon={IconBolt} stroke={1.5} size={30} />{" "}
                      Upgrade
                    </Link>
                  )}

                  <div className="quota">
                    <h3 className="h6">Available Subscription Quota:</h3>
                    <span>
                      <b>{subscription?.pdfs}</b> Documents left.
                    </span>
                    <span>
                      <b>{subscription?.questions}</b> Document Questions left.
                    </span>
                    <span>
                      Max Document Size: <b>{subscription?.pdf_size}MB/doc.</b>
                    </span>
                  </div>
                </>
              )}
              {user && (
                <div
                  className="profile"
                  onClick={() => navigate("/account/settings")}
                >
                  <AvatarPalceholder username={user.username} size={45} />
                  <div>
                    <b>{user.username}</b>
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
            <button
              type="button"
              onClick={() => setToggled((toggled) => !toggled)}
              className="btn btn-light toggle-sidebar-button text-primary"
            >
              <FontAwesomeIcon icon={faBarsStaggered} /> Chats
            </button>
          )}

          <section className="d-flex flex-column flex-grow-1">
            {isEL ? (
              subscription && (subscription?.status === 1 || isDemo) ? (
                subscription?.questions <= 0 ? (
                  <div className="empty-state upgrade-required">
                    <h3>Subscription Limit Reached</h3>
                    <p>Your subscription has reached its maximum usage.</p>
                    <Link to="/pricing" className="btn btn-warning">
                      <TablerIcon icon={IconBolt} stroke={1.5} size={20} />
                      Upgrade Now
                    </Link>
                  </div>
                ) : (
                  currentChatRoomUUID && (
                    <SectionErrorBoundary key={currentChatRoomUUID}>
                      <SectionSuspense>
                        <ChatSection
                          uuid={currentChatRoomUUID}
                          key={currentChatRoomUUID}
                        />
                      </SectionSuspense>
                    </SectionErrorBoundary>
                  )
                )
              ) : (
                <div className="empty-state subscription-required">
                  <h3>Subscription Required</h3>
                  <p>
                    You need an active subscription to use the Playground
                    section.
                  </p>
                  <Link to="/pricing" className="btn btn-warning">
                    <TablerIcon icon={IconBolt} stroke={1.5} size={20} />
                    Get a Subscription
                  </Link>
                </div>
              )
            ) : (
              currentChatRoomUUID && (
                <SectionErrorBoundary key={currentChatRoomUUID}>
                  <SectionSuspense>
                    <ChatSection
                      uuid={currentChatRoomUUID}
                      key={currentChatRoomUUID}
                    />
                  </SectionSuspense>
                </SectionErrorBoundary>
              )
            )}

            {!currentChatRoomUUID && (
              <div className="empty-state">
                <div className="upload-container">
                  {(subscription || demoSubscription) && (
                    <div className="upload-section">
                      <h3>Start by uploading a document</h3>
                      <p className="text-muted mb-4">
                        Upload a document to begin chatting with your AI
                        assistant
                      </p>
                      <Dropzone
                        onUpload={onUpload}
                        onError={onError}
                        name="pdf-file"
                        extraOnUploadProps={{
                          createChatRoom,
                          setProcessing,
                          subscription: subscription as Subscription,
                          isDemo,
                          demoSubscription:
                            demoSubscription as DemoSubscription,
                          setDemoSubscription,
                          queryClient,
                        }}
                        dropzoneOptions={{
                          accept: getAvailableDocumentTypes(),
                          maxSize: 50 * 1024 * 1024, // (in bytes) 50 MB
                        }}
                      >
                        {isProcessing ? (
                          <div className="text-center">
                            <b>
                              <SpinnerGrow size="sm" /> Processing...
                            </b>
                          </div>
                        ) : collapsed ? (
                          <FontAwesomeIcon icon={faPlus} />
                        ) : (
                          <div className="text-center upload-content">
                            <TablerIcon
                              icon={IconCloudUpload}
                              size={48}
                              className="mb-3"
                            />
                            <h4>Upload your document</h4>
                            <p className="text-muted">
                              Drag and drop your file here or click to browse
                              <br />
                              <small>
                                Supported formats:{" "}
                                {getAvailableDocumentTypesString()}
                              </small>
                            </p>
                          </div>
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
  );
}
