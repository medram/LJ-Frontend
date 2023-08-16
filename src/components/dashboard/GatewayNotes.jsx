import { IconInfoCircleFilled } from "@tabler/icons-react";
import TablerIcon from "../TablerIcon";
import { memo } from "react";


export default memo(function GatewayNotes()
{
    return (
        <div className="alert alert-info mt-4">
            <TablerIcon icon={IconInfoCircleFilled} /> <b>What happens when you save?</b>
            <ul>
                <li>Remove/disable old plans for this gateway.</li>
                <li>Cancel all old subscriptions for this gateway.</li>
                <li>Remove webhooks for this gateway.</li>
                <li>Create/sync new plans on the new gateway.</li>
                <li>Register new webhook.</li>
                <li>Save settings.</li>
            </ul>

            <TablerIcon icon={IconInfoCircleFilled} /> This process takes time to complete, please be patient when you hit save.
        </div>
    )
})
