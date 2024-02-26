import TablerIcon from "@components/TablerIcon"
import { faRankingStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCurrentSubscription } from "@hooks/account"
import { IconBolt } from "@tabler/icons-react"
import { Link } from "react-router-dom"


export default function MySubscriptionPage()
{
    const { subscription } = useCurrentSubscription({ suspense: true })

    return (
        <div>
            <h1 className="h3 mb-5">My Subscription</h1>

            {subscription ? (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title d-flex justify-content-between align-items-start">
                            <span>{subscription.plan_name} ({subscription.billing_cycle})</span>
                            <div>
                                {subscription.status === 1?
                                    <span className="badge rounded-pill bg-success" style={{fontSize: "0.8rem"}}>Active</span>
                                :
                                    <span className="badge rounded-pill bg-danger" style={{fontSize: "0.8rem"}}>Expired</span>
                                }

                                {!!subscription.is_free && <span className="badge text-bg-success mx-2" style={{ fontSize: "0.8rem" }} >Free</span>}
                            </div>
                        </h5>
                        <p className="card-text">This subscription will be automatically renewed every {subscription.billing_cycle}.</p>

                        <Link to="/pricing" className="btn btn-primary"><TablerIcon icon={IconBolt} stroke={1.25} /> Upgrade</Link>
                    </div>
                </div>
            ) : (
                <>
                    <span>No subscription yet</span><br />
                    <Link to="/pricing" className="btn btn-primary my-1"><FontAwesomeIcon icon={faRankingStar} /> Subscribe Now</Link>
                </>
            )}

        </div>
    )
}
