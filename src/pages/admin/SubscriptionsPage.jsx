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
import { useDashboardSettings, useDemo } from "../../hooks"
import PayPalIcon from "../../components/icons/PayPalIcon"
import StripIcon from "../../components/icons/StripIcon"
import { useCallback, useMemo, useState } from "react"
import SuperBotton from "../../components/SuperButton"
import AdvancedDataTable from "../../components/AdvancedDataTable"


export function SubscriptionsPage() {
    const { isDemo } = useDemo()
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
            selector: subscription => subscription.gateway_subscription_id ? subscription.gateway_subscription_id : subscription.sub_id
        },
        {
            name: "User",
            selector: subscription => (
                    <>
                        <b>{subscription.user_username}</b><br />
                        { subscription.user_email }
                    </>
                )
        },
        {
            name: "Plan",
            selector: subscription => (
                <>
                    <b>{subscription.plan_name}</b><br />
                    <span className="text-muted">{settings.CURRENCY_SYMBOL}{subscription.price}</span>
                </>
            )
        },
        {
            name: "Subscription Status",
            selector: subscription => (
                <>
                    {subscription.status === 1 ? (
                        <Badge pill bg="success">Active</Badge>
                    ) : (subscription.status === 0 ? (
                        <Badge pill bg="warning">Expired</Badge>
                    ) : (subscription.status === 2 &&
                        <Badge pill bg="danger">Canceled</Badge>
                    )
                    )}
                </>
            )
        },
        {
            name: "Billing Cycle",
            selector: subscription => (
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
            selector: subscription => (
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
            selector: subscription => datetimeFormat(subscription.created_at)
        },
        {
            name: "Expiring at",
            selector: subscription => datetimeFormat(subscription.expiring_at)
        },
        {
            name: "Actions",
            selector: subscription => (
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

    if (isLoading)
    {
        return <SectionLoading center={true} />
    }

    return (
        <>
            <h1 className="mb-3">Subscriptions</h1>

            <div className="row">
                <div className="col-12">
                    <section className="bg-light rounded p-4">
                        <AdvancedDataTable
                            columns={columns}
                            data={subscriptions}
                            searchFunction={(subscription, searchQuery) => {
                                return [subscription.gateway_subscription_id, subscription.sub_id, subscription.user_email, subscription.user_username].includes(searchQuery)
                            }}
                        />
                    </section>
                </div>
            </div>
        </>
    )
}
