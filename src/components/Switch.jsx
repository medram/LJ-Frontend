import ReactSwitch from "react-switch";


export default function Switch(props)
{
    let { size, ...rest } = props

    rest = { ...rest, checkedIcon: false, uncheckedIcon: false }

    if (size === "small")
        rest = { ...rest, height: 18, width: 32 }

    return (
        <ReactSwitch {...rest} />
    )
}
