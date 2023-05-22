import { toast } from "react-toastify"
import SectionLoading from "../../components/SectionLoading"
import { usePages, useSubscriptions } from "../../hooks/admin"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { deletePage } from "../../api/admin"
import Swal from "sweetalert2"
import { useQueryClient } from "react-query"
import { datetimeFormat } from "../../utils"
import { Badge } from "react-bootstrap"
import { useDashboardSettings } from "../../hooks"
import PayPalIcon from "../../components/icons/PayPalIcon"
import StripIcon from "../../components/icons/StripIcon"


export function SubscriptionsPage() {
    const { isLoading, isError, error, subscriptions } = useSubscriptions()
    const { settings } = useDashboardSettings()


    if (isLoading || !Object.keys(subscriptions).length)
    {
        return <SectionLoading center={true} />
    }

    return (
        <>
            <h1 className="mb-3">Subscriptions</h1>

            <div className="row">
                <div className="col-12">
                    <section className="bg-light rounded p-4">
                        <table className="table table-responsive">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Plan</th>
                                    <th>Subscription Status</th>
                                    <th>Billing Cycle</th>
                                    <th>Gateway</th>
                                    <th>Subscribed on</th>
                                    <th>Expiring at</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions?.map((subscription, i) => (
                                    <tr key={i} valign="middle">
                                        <td>{subscription.sub_id}</td>
                                        <td>{subscription.user_email}</td>
                                        <td>
                                            <b>{subscription.plan_name}</b><br />
                                            <span className="text-muted">{settings.CURRENCY_SYMBOL}{subscription.price}</span>
                                        </td>
                                        <td>{subscription.status === 1 ? (
                                            <Badge bg="success">Active</Badge>
                                        ) : (subscription.status === 0 ? (
                                            <Badge bg="warning">Expired</Badge>
                                        ): (subscription.status === 2 &&
                                            <Badge bg="danger">Cancelled</Badge>
                                        )
                                        )}</td>
                                        <td>{subscription.billing_cycle === "monthly" ? (
                                            <Badge pill bg="primary">Monthly</Badge>
                                        ) : (subscription.billing_cycle === "yearly" &&
                                            <Badge pill bg="warning">Yearly</Badge>
                                        )}</td>
                                        <td>{subscription.payment_gateway === "PAYPAL" ? (
                                            <PayPalIcon height={30} />
                                        ) : (subscription.payment_gateway === "STRIPE" &&
                                            <StripIcon height={30} />
                                        )}</td>
                                        <td>{datetimeFormat(subscription.created_at)}</td>
                                        <td>{datetimeFormat(subscription.expiring_at)}</td>
                                        <td>-</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        </>
    )
}
