import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ChatSection({ title, onClick, onDelete })
{
    return (
        <div role="button" className="chat-label" onClick={onClick} >
            {title}
            <span className="delete" onClick={onDelete}><FontAwesomeIcon icon={faTrash} /></span>
        </div>
    )
}
