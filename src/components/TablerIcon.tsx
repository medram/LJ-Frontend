import { Icon } from "@tabler/icons-react"
import { memo } from "react"

type TablerIconProps = {
    icon: Icon,
    [rest: string]: unknown
}

export default memo(function TablerIcon({ icon: Icon, ...rest}: TablerIconProps)
{
    return <Icon {...{ stroke: 1, ...rest }} />
})
