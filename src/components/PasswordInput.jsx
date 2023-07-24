import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useState } from "react";
import { useDemo } from "../hooks";


export default memo(function PasswordInput({ skipDemoMode = false, ...restProps })
{
    const [show, setShow] = useState(false)
    const { isDemo } = useDemo()

    const value = isDemo && !skipDemoMode ? (restProps?.value ? "**** Hidden for demo mode ****" : "") : restProps?.value

    return (
        <div className="input-group mb-3">
            <input type={show ? "text" : "password" } className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1" {...restProps} value={value} />
            <span className="input-group-text text-bg-primary" id="basic-addon1" style={{ cursor: "pointer" }} onClick={() => setShow(!show)}>
                <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
            </span>
        </div>
    )
})
