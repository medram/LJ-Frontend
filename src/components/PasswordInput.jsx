import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useState } from "react";


export default memo(function PasswordInput({ ...restProps })
{
    const [show, setShow] = useState(false)

    return (
        <div className="input-group mb-3">
            <input type={show ? "text" : "password" } className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1" {...restProps} />
            <span className="input-group-text text-bg-primary" id="basic-addon1" style={{ cursor: "pointer" }} onClick={() => setShow(!show)}>
                <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
            </span>
        </div>
    )
})
