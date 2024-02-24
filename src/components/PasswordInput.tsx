import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { memo, useState } from "react";
import { useDemo } from "../hooks";
import TablerIcon from "./TablerIcon";


type PasswordInputProps = {
    skipDemoMode?: boolean,
    value?: string,
    [rest: string]: unknown
}

export default memo(function PasswordInput({ skipDemoMode=false, value="", ...restProps }: PasswordInputProps)
{
    const [show, setShow] = useState(false)
    const { isDemo } = useDemo()

    const currentValue = isDemo && !skipDemoMode ? (value ? "**** Hidden for demo mode ****" : "") : value

    return (
        <div className="input-group mb-3">
            <input type={show ? "text" : "password" } className="form-control" placeholder="password" aria-label="password" aria-describedby="basic-addon1" {...restProps} value={currentValue} />
            <span className="input-group-text text-bg-primary" id="basic-addon1" style={{ cursor: "pointer" }} onClick={() => setShow(!show)}>
                <TablerIcon icon={show ? IconEyeClosed : IconEye } />
            </span>
        </div>
    )
})
