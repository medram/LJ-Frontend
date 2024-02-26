import { SubscriptionType } from "@/utils/types"
import { cancelSubscription } from "@api/admin"
import AdvancedDataTable from "@components/AdvancedDataTable"
import SuperBotton from "@components/SuperButton"
import PayPalIcon from "@components/icons/PayPalIcon"
import StripIcon from "@components/icons/StripIcon"
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSubscriptions } from "@hooks/admin"
import { useDashboardSettings, useDemo } from "@hooks/index"
import { datetimeFormat } from "@utils/index"
import { useCallback, useMemo, useState } from "react"
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import Swal from "sweetalert2"


export function SubscriptionsPage() {
    const { isDemo } = useDemo()
    const queryClient = useQueryClient()
    const { subscriptions } = useSubscriptions()
    const { settings } = useDashboardSettings()
    const [isCanceling, setCanceling] = useState(false)


    const handleCancelSubscription = useCallback((sub_id: any) => {
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

                if (isDemo)
                    return toast.success("This action isn't allowed on the demo mode!")

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
    }, [isDemo])

    const columns = useMemo(() => [
        {
            name: "ID",
            selector: (subscription: SubscriptionType) => subscription.gateway_subscription_id ? subscription.gateway_subscription_id : subscription.sub_id
        },
        {
            name: "User",
            selector: (subscription: SubscriptionType) => (
                    <>
                        <b>{subscription.user_username}</b><br />
                        { subscription.user_email }
                    </>
                )
        },
        {
            name: "Plan",
            selector: (subscription: SubscriptionType) => (
                <>
                    <b>{subscription.plan_name}</b><br />
                    <span className="text-muted">{settings.CURRENCY_SYMBOL}{subscription.price}</span>
                </>
            )
        },
        {
            name: "Subscription Status",
            selector: (subscription: SubscriptionType) => (
                <>
                    {subscription.status === 1 ? (
                        <Badge pill bg="success">Active</Badge>
                    ) : (subscription.status === 0 ? (
                        <Badge pill bg="black">Expired</Badge>
                    ) : (subscription.status === 2 ? (
                        <Badge pill bg="danger">Canceled</Badge>
                    ) : (subscription.status === 3 ? (
                        <Badge pill bg="warning">Suspended</Badge>
                    ) : (subscription.status === 4) && (
                        <Badge pill bg="info">Upgraded</Badge>
                    ))))}
                </>
            )
        },
        {
            name: "Billing Cycle",
            selector: (subscription: SubscriptionType) => (
                <>
                    {subscription.billing_cycle === "monthly" ? (
                        <Badge pill bg="primary">Monthly</Badge>
                    ) : (subscription.billing_cycle === "yearly" &&
                        <Badge pill bg="warning">Yearly</Badge>
                    )}
                </>
            )
        },
        {
            name: "Gateway",
            selector: (subscription: SubscriptionType) => (
                <>
                    {subscription.payment_gateway === "" && "-"}
                    {subscription.payment_gateway === "PAYPAL" ? (
                        <PayPalIcon height={30} />
                    ) : (subscription.payment_gateway === "STRIPE" &&
                        <StripIcon height={30} />
                    )}
                </>
            )
        },
        {
            name: "Subscribed at",
            selector: (subscription: SubscriptionType) => datetimeFormat(subscription.created_at)
        },
        {
            name: "Expiring at",
            selector: (subscription: SubscriptionType) => datetimeFormat(subscription.expiring_at)
        },
        {
            name: "Actions",
            selector: (subscription: SubscriptionType) => (
                <>
                    {subscription.status === 1 ? (
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
                    ) : "-" }
                </>
            )
        },
    ], [])

    return (
        <>
            <h1 className="mb-3">Subscriptions</h1>

            <div className="row">
                <div className="col-12">
                    <section className="bg-light rounded p-4">
                        <AdvancedDataTable
                            columns={columns}
                            data={subscriptions}
                            searchFunction={(subscription: SubscriptionType, searchQuery: any) => {
                                return [subscription.gateway_subscription_id, subscription.sub_id, subscription.user_email, subscription.user_username].includes(searchQuery)
                            }}
                        />
                    </section>
                </div>
            </div>
        </>
    )
}
