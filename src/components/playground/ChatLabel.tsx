import { IconMessageDots, IconTrash, IconLoader2 } from "@tabler/icons-react";
import { useState } from "react";
import TablerIcon from "../TablerIcon";

interface ChatLabelProps {
  title: string;
  onClick: () => void;
  onDelete?: (callback: () => void) => void;
  active?: boolean;
}

export default function ChatLabel({
  title,
  onClick,
  onDelete,
  active = false,
}: ChatLabelProps) {
  const [isDeletingChatRoom, setDeletingChatRoom] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingChatRoom(true);
    if (typeof onDelete === "function") {
      onDelete(() => setDeletingChatRoom(false));
    }
  };

  return (
    <div
      role="button"
      className={`chat-label ${active ? "active" : ""}`}
      onClick={onClick}
      title={title}
    >
      <div className="chat-label-content">
        <TablerIcon icon={IconMessageDots} stroke={1.5} size={18} />
        <span className="chat-label-text">{title}</span>
      </div>
      {onDelete && (
        <button
          className="delete-button"
          onClick={handleDelete}
          disabled={isDeletingChatRoom}
          title="Delete chat"
        >
          {isDeletingChatRoom ? (
            <TablerIcon
              icon={IconLoader2}
              className="spin"
              stroke={1.5}
              size={16}
            />
          ) : (
            <TablerIcon icon={IconTrash} stroke={1.5} size={16} />
          )}
        </button>
      )}
    </div>
  );
}
