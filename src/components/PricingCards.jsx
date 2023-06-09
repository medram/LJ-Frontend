import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { usePlans, useSettings } from "../hooks"
import SectionLoading from "./SectionLoading"
import { useUser } from "../hooks/auth"
import SuperButton from "./SuperButton"
import { useCallback } from "react"
import { useCurrentSubscription } from "../hooks/account"


export default function PricingCards({ yearly })
{
    const { isLoading, settings } = useSettings()
    const { isLoading: isPlansLoading, plans, monthlyPlans, yearlyPlans } = usePlans()

    const { isAuthenticated } = useUser()
    const { subscription } = useCurrentSubscription()


    const handlePlanActivation = useCallback(plan_id => {
        console.log("clicked")
    })


    if (isLoading || !Object.keys(settings).length || isPlansLoading)
    {
        return <SectionLoading center={true} />
    }

    const plansToRender = yearly ? yearlyPlans : monthlyPlans


    return (
        <div className="pricing-section">
            {plansToRender?.map((plan, i) => {
                return (
                    <div className={plan.is_popular ? "pricing-card popular" : "pricing-card"} key={i}>
                        <div className="pricing-title">{plan.name}</div>
                        <div className="pricing">{settings?.CURRENCY_SYMBOL}{plan.price}<span className="small-text">/{yearly ? "year" : "month"}</span></div>
                        <div className="text-center">{plan.description}</div>
                        <div className="pricing-body">
                            <ul>
                                <li><FontAwesomeIcon icon={faCheck} className="text-success" /> <b>{plan.pdfs ? plan.pdfs : "Unlimited"}</b> PDFs</li>
                                <li><FontAwesomeIcon icon={faCheck} className="text-success" /> Max PDF size: <b>{plan.pdf_size ? plan.pdf_size + "MB/pdf" : "Unlimited"}</b>
                                </li>
                                <li><FontAwesomeIcon icon={faCheck} className="text-success" /> <b>{plan.questions ? plan.questions : "Unlimited"}</b> PDF Questions</li>
                                {plan.features?.split("\n")?.map((feature, i) => {
                                    return <li key={i}><FontAwesomeIcon icon={faCheck} /> {feature}</li>
                                })}
                            </ul>
                        </div>
                        {isAuthenticated ? (
                            subscription ? (
                                subscription?.plan_id == plan.id ? (
                                    <SuperButton onClick={() => handlePlanActivation(plan.id)} className="btn btn-primary btn-lg w-100" disabled >Current</SuperButton>
                                ) : (
                                    <Link to={`../checkout/${plan.id}`} className="btn btn-primary btn-lg d-block" >Upgrade</Link>
                                )
                            ) : (
                                <Link to={`../checkout/${plan.id}`} className="btn btn-primary btn-lg d-block" >
                                    {plan.is_free || plan.price == 0 ? "Subscribe Now" : "Order Now"}
                                </Link>
                            )
                        ) : (
                            <Link to="../login?to=/pricing" className="btn btn-primary btn-lg d-block" >
                                    {plan.is_free || plan.price == 0 ? "Subscribe Now" : "Order Now"}
                            </Link>
                        )}
                    </div>
                )
            })}

        </div>
    )
}
