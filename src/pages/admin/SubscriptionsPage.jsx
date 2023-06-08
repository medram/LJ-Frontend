import { toast } from "react-toastify"
import SectionLoading from "../../components/SectionLoading"
import { usePages, useSubscriptions } from "../../hooks/admin"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleMinus, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { cancelSubscription, deletePage } from "../../api/admin"
import Swal from "sweetalert2"
import { useQueryClient } from "react-query"
import { datetimeFormat } from "../../utils"
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useDashboardSettings } from "../../hooks"
import PayPalIcon from "../../components/icons/PayPalIcon"
import StripIcon from "../../components/icons/StripIcon"
import { useCallback, useState } from "react"
import SuperBotton from "../../components/SuperButton"


export function SubscriptionsPage() {
    const queryClient = useQueryClient()
    const { isLoading, isError, error, subscriptions } = useSubscriptions()
    const { settings } = useDashboardSettings()
    const [isCanceling, setCanceling] = useState(false)


    const handleCancelSubscription = useCallback((sub_id) => {
        Swal.fire({
            title: "Subscription Cancellation Confirmation",
            html: `Are you sure you want to cancel this subscription?<br>
            <small><i><b>Note:</b> The subscription is going to be canceled from your payment gatway platforms as well.</i></small>`,
            icon: "warning",
            confirmButtonText: "Yes, Cancel Now",
            cancelButtonText: "No, Never Mind!",
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                setCanceling(true)
                cancelSubscription(sub_id).then(data => {
                    if (!data?.errors) {
                        toast.success(data?.message)
                        queryClient.invalidateQueries("admin.subscriptions")
                    }
                    else {
                        toast.error(data?.message)
                    }
                }).finally(() => {
                    setCanceling(false)
                })
            }
        })
    }, [])


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
                                        <td style={{whiteSpace: "nowrap"}}><small>{subscription.gateway_subscription_id}</small></td>
                                        <td>
                                            <b>{subscription.user_username}</b><br />
                                            {subscription.user_email}
                                        </td>
                                        <td>
                                            <b>{subscription.plan_name}</b><br />
                                            <span className="text-muted">{settings.CURRENCY_SYMBOL}{subscription.price}</span>
                                        </td>
                                        <td>{subscription.status === 1 ? (
                                            <Badge pill bg="success">Active</Badge>
                                        ) : (subscription.status === 0 ? (
                                            <Badge pill bg="warning">Expired</Badge>
                                        ): (subscription.status === 2 &&
                                            <Badge pill bg="danger">Canceled</Badge>
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
                                        <td>
                                            {subscription.status === 1 && (
                                                <OverlayTrigger
                                                    placement="top"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={(props) => (
                                                        <Tooltip id="button-tooltip" {...props}>
                                                            Cancel subscription
                                                        </Tooltip>
                                                    )}
                                                >
                                                    <SuperBotton isLoading={isCanceling} className="btn btn-danger btn-sm d-flex align-items-center" onClick={() => handleCancelSubscription(subscription.sub_id)}><FontAwesomeIcon icon={faCircleMinus} /></SuperBotton>
                                                </OverlayTrigger>
                                            )}
                                        </td>
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
