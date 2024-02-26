import { PlanType } from "@/utils/types"
import SuperButton from "@components/SuperButton"
import TablerIcon from "@components/TablerIcon"
import { MotionDiv, MotionItem } from "@components/animations"
import { useCurrentSubscription } from "@hooks/account"
import { useUser } from "@hooks/auth"
import { usePlans, useSettings } from "@hooks/index"
import { useLoginRegister } from "@hooks/templates"
import { IconCircleCheck } from "@tabler/icons-react"
import { useCallback } from "react"
import { Link } from "react-router-dom"


export default function PricingCards({ yearly }: { yearly: boolean })
{
    const { settings } = useSettings()
    const { isAuthenticated } = useUser()
    const { monthlyPlans, yearlyPlans } = usePlans()
    const { subscription } = useCurrentSubscription({ suspense: false })

    const { isOpen, open, close, LoginRegisterModel } = useLoginRegister()

    const handlePlanActivation = useCallback((plan_id: number) => {
        console.log("clicked")
    }, [])

    const plansToRender: PlanType[] = yearly ? yearlyPlans : monthlyPlans

    return (
        <MotionDiv className="pricing-section" key={plansToRender}>

            {!plansToRender?.length && (
                <span>No available plans found!</span>
            )}
            {plansToRender?.map((plan, i) => {
                return (
                    <MotionItem className={plan.is_popular ? "pricing-card popular" : "pricing-card"} key={plan.id}
                    variants={{
                        hidden: {
                            opacity: 0,
                            transform: "translateY(20px) scale(0.8)",
                        },
                        show: {
                            opacity: 1,
                            transform: "translateY(0) scale(1)",
                            transition: {
                                duration: 0.6,
                                ease: "backOut",
                            },
                        },

                    }}
                    >

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
                                    <button onClick={() => open()} className="btn btn-primary w-100" >
                                        {plan.is_free || plan.price == 0 ? "Sign Up" : "Subscribe"}
                                    </button>
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

                    </MotionItem>
                )
            })}

            <LoginRegisterModel
                title="Please Sign-in to continue"
                onLogin={() => close()}
            />
        </MotionDiv>
    )
}
