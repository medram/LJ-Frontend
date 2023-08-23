import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { usePlans, useSettings } from "../hooks"
import SectionLoading from "./SectionLoading"
import { useUser } from "../hooks/auth"
import SuperButton from "./SuperButton"
import { useCallback } from "react"
import { useCurrentSubscription } from "../hooks/account"
import TablerIcon from "./TablerIcon"
import { IconCircleCheck } from "@tabler/icons-react"


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
            {!plansToRender?.length && (
                <span>No available plans found!</span>
            )}
            {plansToRender?.map((plan, i) => {
                return (
                    <div className={plan.is_popular ? "pricing-card popular" : "pricing-card"} key={i}>
                        <div className="pricing-title">{plan.name}</div>
                        <div className="pricing">{settings?.CURRENCY_SYMBOL}{plan.price}<span className="small-text">/{yearly ? "year" : "month"}</span></div>
                        <div className="text-center">{plan.description}</div>
                        <div className="pricing-body">
                            <div className="mt-2">
                                {isAuthenticated ? (
                                    subscription ? (
                                        subscription?.plan_id == plan.id ? (
                                            <SuperButton onClick={() => handlePlanActivation(plan.id)} className="btn btn-primary w-100" disabled >Current</SuperButton>
                                        ) : (
                                            <Link to={`../checkout/${plan.id}`} className="btn btn-primary d-block" >Upgrade</Link>
                                        )
                                    ) : (
                                        <Link to={`../checkout/${plan.id}`} className="btn btn-primary d-block" >
                                            {plan.is_free || plan.price == 0 ? "Subscribe Now" : "Subscribe"}
                                        </Link>
                                    )
                                ) : (
                                    <Link to="../login?to=/pricing" className="btn btn-primary d-block" >
                                        {plan.is_free || plan.price == 0 ? "Subscribe Now" : "Subscribe"}
                                    </Link>
                                )}
                            </div>
                            <ul>
                                <li><TablerIcon icon={IconCircleCheck} className="text-success" /> <b>{plan.pdfs ? plan.pdfs : "Unlimited"}</b> PDFs</li>
                                <li><TablerIcon icon={IconCircleCheck} className="text-success" /> Max PDF size: <b>{plan.pdf_size ? plan.pdf_size + "MB/pdf" : "Unlimited"}</b>
                                </li>
                                <li><TablerIcon icon={IconCircleCheck} className="text-success" /> <b>{plan.questions ? plan.questions : "Unlimited"}</b> PDF Questions</li>
                                {plan.features?.split("\n")?.map((feature, i) => {
                                    return <li key={i}><TablerIcon icon={IconCircleCheck} className="text-success" /> {feature}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
