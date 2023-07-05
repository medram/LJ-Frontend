import { faCircleNotch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


export default function ChatLabel({ title, onClick, onDelete, active=false })
{
    const [isDeletingChatRoom, setDeletingChatRoom] = useState(false)

    const handleDelete = () => {
        setDeletingChatRoom(true)
        if (typeof onDelete === "function")
            onDelete(() => {
                setDeletingChatRoom(false)
            })
    }

    return (
        <div role="button" className={["chat-label", active && "active"].join(" ")} onClick={onClick} >
            {title}
            <span className="delete" onClick={handleDelete}>
                {isDeletingChatRoom ? (
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                ) : (
                    <FontAwesomeIcon icon={faTrash} />
                )}
            </span>
        </div>
    )
}
