import { Link } from "react-router-dom"
import SectionLoading from "../../../components/SectionLoading"
import { useCurrentSubscription } from "../../../hooks/account"
import { useUser } from "../../../hooks/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGem, faRankingStar } from "@fortawesome/free-solid-svg-icons"


export default function MySubscriptionPage()
{
    const { user } = useUser()
    const { isLoading, subscription } = useCurrentSubscription()

    if (isLoading)
    {
        return <SectionLoading center={true} />
    }

    return (
        <div>
            <h1 className="h3 mb-5">My Subscription</h1>

            {subscription ? (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{subscription.plan_name} ({subscription.billing_cycle}) {!!subscription.is_free && <span className="badge text-bg-success">Free</span>}</h5>
                        <p className="card-text">This subscription will be automatically renewed every {subscription.billing_cycle}.</p>
                        <Link to="/pricing" className="btn btn-primary"><FontAwesomeIcon icon={faGem} /> Upgrade</Link>
                    </div>
                </div>
            ) : (
                <>
                    <span>No subscription yet</span><br />
                    <Link to="/pricing" className="btn btn-primary my-1"><FontAwesomeIcon icon={faRankingStar} /> Show Plans</Link>
                </>
            )}

        </div>
    )
}
