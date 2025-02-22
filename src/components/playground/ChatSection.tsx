import { DEMO_SUBSCRIPTION } from "@/utils";
import { ChatMessage, ChatMessageType } from "@/utils/types";
import { clearChatHistory, sendPrompt, stopPrompt } from "@api/account";
import SuperButton from "@components/SuperButton";
import TablerIcon from "@components/TablerIcon";
import useChatRoom from "@hooks/account";
import { useDemo, useNaiveLocalStorage, useScrollToRef } from "@hooks/index";
import { IconPlayerStopFilled, IconSend, IconTrash } from "@tabler/icons-react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import AIMessage from "./AIMessage";
import PlaceholderMessage from "./PlaceholderMessage";
import UserMessage from "./UserMessage";

interface ChatSectionProps {
  uuid: string;
}

export default function ChatSection({ uuid }: ChatSectionProps) {
  const { isDemo } = useDemo();
  const [getDemoSubscription, setDemoSubscription] = useNaiveLocalStorage(
    "demo_sub",
    DEMO_SUBSCRIPTION
  );
  const demoSubscription = getDemoSubscription();

  const queryClient = useQueryClient();
  const { isError, error, chat } = useChatRoom(uuid);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isSending, setSending] = useState(false);
  const [isClearingChatHistory, setClearingChatHistory] = useState(false);
  const [promptContainerRef, scrollToPrompt] = useScrollToRef<HTMLDivElement>();
  const [messagesContainerRef, scrollToBottom] =
    useScrollToRef<HTMLDivElement>();

  const inputRef = useCallback((node: HTMLInputElement | null) => {
    if (node) {
      node.focus();
    }
  }, []);

  useEffect(() => {
    if (chat) {
      let messages: ChatMessage[] = [];
      chat.chat_history.map((message: ChatMessageType, i: number) => {
        if (message.type === "ai")
          messages.push(<AIMessage key={i} content={message.content} />);
        else messages.push(<UserMessage key={i} content={message.content} />);
      });

      setChatHistory(messages);
    } else {
      setChatHistory([]);
    }
  }, [chat]);

  // Scroll when chat history changes
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!prompt.trim()) {
        return toast.warning("Please ask something.");
      }

      if (isDemo && demoSubscription?.questions <= 0) {
        return toast.warning(
          "The demo quota is exceeded, please wait 12 hours 🙏"
        );
      }

      setSending(true);

      setChatHistory((chatHistory) => {
        return [
          ...chatHistory,
          <UserMessage key={Math.random()} content={prompt} />,
          <PlaceholderMessage key={Math.random()} />,
        ];
      });
      setPrompt(""); // clear the prompt
      scrollToBottom();

      sendPrompt(uuid, prompt)
        .then((data) => {
          if (!data?.errors) {
            const reply: string = data?.response?.output?.trim() as string;

            if (!reply) {
              toast.error(
                "OpenAI servers are overloaded, please try again or later"
              );
            }

            setChatHistory((chatHistory) => {
              // remove the PlaceholderMessage first, before appending the reply
              return [
                ...chatHistory.slice(0, -1),
                <AIMessage key={Math.random()} content={reply} />,
              ];
            });

            // invalidate subscription cache
            queryClient.invalidateQueries("user.subscription");

            // for demo only
            if (isDemo) {
              setDemoSubscription((prev) => {
                return {
                  ...prev,
                  questions: prev.questions - 1,
                };
              });
            }
          } else {
            toast.error(data.message);
            setChatHistory((chatHistory) => {
              // remove the PlaceholderMessage first, before appending the reply
              return chatHistory.slice(0, -1);
            });
          }
        })
        .catch((err) => {
          if (err.response?.data?.message) {
            toast.warning(err.response?.data?.message);
          } else {
            toast.error(err.message);
          }

          setChatHistory((chatHistory) => {
            // remove the PlaceholderMessage first, before appending the reply
            return chatHistory.slice(0, -1);
          });
        })
        .finally(() => {
          setSending(false);
          queryClient.invalidateQueries(`user.chat.${uuid}`);
          // scroll down
          scrollToBottom();
        });
    },
    [uuid, prompt]
  );

  const handleStop = useCallback(
    (e: any) => {
      stopPrompt(uuid)
        .then((req) => {
          console.log("prompt stopped");
        })
        .catch((err) => {
          if (err.response.status === 422 || err.response.status === 400) {
            toast.warning(err.response?.data?.message);
          } else {
            toast.error(err.message);
          }
        })
        .finally(() => {});
      // reset the prompt input
      setSending(false);
      setChatHistory((chatHistory) => {
        // remove the PlaceholderMessage
        return chatHistory.slice(0, -1);
      });
    },
    [uuid]
  );

  const handleClearChatHistory = useCallback(() => {
    setClearingChatHistory(true);

    clearChatHistory(uuid)
      .then((req) => {
        if (req.status === 204) {
          toast.success("Cleared successfully.");
          queryClient.invalidateQueries(`user.chat.${uuid}`);
          setChatHistory([]);
        } else {
          toast.warning("Something went wrong!");
        }
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setClearingChatHistory(false);
      });
  }, [uuid]);

  if (isError) {
    toast.error(error as string);
  }

  return (
    <>
      <div className="chat-section">
        <div className="chat-messages">
          <div className="messages-container">
            {chatHistory.map((message, i) => message)}
            <span ref={messagesContainerRef}></span>
          </div>
        </div>
        <div className="chat-input" ref={promptContainerRef}>
          <div className="input-container">
            <form onSubmit={handleSubmit} className="message-form">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask your document a question..."
                disabled={isSending}
                ref={inputRef}
                className="message-input"
              />
              <div className="input-buttons">
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => (
                    <Tooltip id="send-button-tooltip" {...props}>
                      {isSending ? "Stop" : "Send"}
                    </Tooltip>
                  )}
                >
                  <div className="button-wrapper">
                    <SuperButton
                      disabled={
                        (!prompt && !isSending) || isClearingChatHistory
                      }
                      className={`btn send ${isSending ? "btn-danger" : ""}`}
                      onClick={(e: React.MouseEvent) => {
                        if (isSending) return handleStop(e);
                        handleSubmit(e as unknown as FormEvent);
                      }}
                      isLoading={false}
                      loadingText=""
                      spinnerClassName=""
                    >
                      {isSending ? (
                        <TablerIcon icon={IconPlayerStopFilled} stroke={1.5} />
                      ) : (
                        <TablerIcon icon={IconSend} stroke={1.5} />
                      )}
                    </SuperButton>
                  </div>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={(props) => (
                    <Tooltip id="clear-history-tooltip" {...props}>
                      Clear Chat History
                    </Tooltip>
                  )}
                >
                  <div className="button-wrapper">
                    <SuperButton
                      className="btn clear-history"
                      disabled={isSending || chatHistory.length === 0}
                      isLoading={isClearingChatHistory}
                      onClick={handleClearChatHistory}
                      loadingText="Clearing..."
                      spinnerClassName=""
                    >
                      <TablerIcon icon={IconTrash} stroke={1.5} />
                    </SuperButton>
                  </div>
                </OverlayTrigger>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
