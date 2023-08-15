import { memo } from "react"


export default memo(function TablerIcon({ icon: Icon, ...rest})
{
    return <Icon {...{ stroke: 1, ...rest }} />
})
