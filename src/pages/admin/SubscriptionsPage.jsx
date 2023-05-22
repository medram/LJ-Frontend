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


export function SubscriptionsPage() {
    const { isLoading, isError, error, subscriptions } = useSubscriptions()

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
                                    <th>Status</th>
                                    <th>Gateway</th>
                                    <th>Expiring at</th>
                                    <th>Created at</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions?.map((subscription, i) => (
                                    <tr key={i}>
                                        <td>{subscription.sub_id}</td>
                                        <td>{subscription.user_id}</td>
                                        <td>{subscription.plan_id}</td>
                                        <td>{subscription.status === 1 ? (
                                            <Badge bg="success">Active</Badge>
                                        ) : (subscription.status === 0 ? (
                                            <Badge bg="warning">Expired</Badge>
                                        ): (subscription.status === 2 &&
                                            <Badge bg="danger">Cancelled</Badge>
                                        )
                                        )}</td>
                                        <td>{subscription.payment_gateway === "PAYPAL"? (
                                            <Badge bg="info">PayPal</Badge>
                                        ) : (subscription.payment_gateway === "STRIPE" &&
                                            <Badge bg="secondary">Stripe</Badge>
                                        )}</td>
                                        <td>{datetimeFormat(subscription.expiring_at)}</td>
                                        <td>{datetimeFormat(subscription.created_at)}</td>
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
