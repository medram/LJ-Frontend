import { faCircleNotch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import TablerIcon from "../TablerIcon";
import { IconMessageDots, IconTrash } from "@tabler/icons-react";


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
            <TablerIcon icon={IconMessageDots} stroke={1.25} /> {title}
            <span className="delete" onClick={handleDelete}>
                {isDeletingChatRoom ? (
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                ) : (
                    <TablerIcon icon={IconTrash} stroke={1.25} />
                )}
            </span>
        </div>
    )
}
