import { memo } from "react";
import ReactSwitch from "react-switch";

type SwitchProps = {
    size: "small" | number,
    [key: string]: unknown
}

export default memo(function Switch(props: SwitchProps)
{
    let { size, ...rest } = props

    let newRest: any = { ...rest, checkedIcon: false, uncheckedIcon: false }

    if (size === "small")
        newRest = { ...rest, height: 18, width: 32 }
    else
        newRest = { ...rest, height: 18, width: 32, size }

    return (
        <ReactSwitch {...newRest} />
    )
})
