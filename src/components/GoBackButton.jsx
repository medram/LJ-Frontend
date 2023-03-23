import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";


export default function GoBackButton({ onClick })
{
    const navigate = useNavigate()

    if (!onClick)
    {
        onClick = () => {
            navigate(-1)
        }
    }

    return (
        <button className="btn btn-outline-primary btn-sm mb-4" onClick={onClick}><FontAwesomeIcon icon={faArrowLeftLong} /> Go back</button>
    )
}
