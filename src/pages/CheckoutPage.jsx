import { useParams, Navigate, useNavigate } from "react-router-dom";
import BasePage from "./layouts/BasePage";
import Heading from "../components/Heading";
import { useAvailablePaymentMethods, useDemo, usePlan, useSettings } from "../hooks";
import SectionLoading from "../components/SectionLoading";
import { Accordion, Card, ListGroup } from "react-bootstrap";
import PayPalIcon from "../components/icons/PayPalIcon";
import StripIcon from "../components/icons/StripIcon";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import SuperButton from "../components/SuperButton";
import { toast } from "react-toastify";
import { payNow } from "../api";
import { subscribeToFreePlan } from "../api/account";


export default function CheckoutPage()
{
    const { id } = useParams()
    const navigate = useNavigate()
    const { isDemo } = useDemo()
    const { isLoading, settings } = useSettings()
    const { isLoading: isPlanLoading, plan } = usePlan(id)
    const { isLoading: isPaymentMethodsLoading, paymentMethods } = useAvailablePaymentMethods()
    const [ selectedPaymentMethod, setSelectedPaymentMethod ] = useState(null)
    const [ isProcessingPayment, setProcessingPayment ] = useState(false)

    const handlePayment = () => {
        if (isDemo)
            return toast.success("This action isn't allowed on the demo mode!")

        setProcessingPayment(true)

        if (plan.is_free || plan.price == 0)
        {
            subscribeToFreePlan(id).then(data => {
                if (data?.errors)
                    return toast.error(data.message)

                toast.success("Subscribed Successfully.")
                return navigate("/account/settings/subscription", { replace: true })

            }).catch(err => {
                if(err.response?.data?.message)
                    toast.error(err.response?.data?.message)
                else
                    toast.error(err)
            }).finally(() => {
                setProcessingPayment(false)
            })
        }
        else
        {
            payNow({
                gateway: selectedPaymentMethod,
                type: "subscription",
                id: parseInt(id)
            }).then(data => {
                if (data?.errors)
                    return toast.info(data.message)

                // Redirect to Paymet gateway.
                window.location.href = data.gateway_link
            }).catch (err => {
                if (err.response?.data?.message)
                    toast.error(err.response?.data?.message)
                else
                    toast.error(err)
            }).finally(() => {
                setProcessingPayment(false)
            })
        }

    }


    if (isLoading || isPlanLoading || !Object.keys(plan).length)
    {
        return <SectionLoading center={true} />
    }


    return (
        <BasePage>
            <Heading title="Checkout" subTitle="Home > Checkout"></Heading>
            <section className="container py-5">
                <div className="row">
                    <div className="col-md-8">
                        <Card border="light mb-4 rounded-4 shadow-sm">
                            <Card.Body className="p-4">
                                <Card.Title className="mb-4">PAYMENT METHODS</Card.Title>

                                {(isPaymentMethodsLoading) ? (
                                    <SectionLoading center={true} />
                                ) : (
                                    <>
                                    {!paymentMethods?.length ? <span>No available payment methods.</span> : <span>Select your favorite payment method:</span>}
                                    <div className="row row-cols-1 row-cols-md-2 g-3 mt-2">

                                        {paymentMethods?.map((method, i) => {
                                            return <div className="col" key={i}>
                                                <div onClick={() => setSelectedPaymentMethod(method.type)} className={["payment-method", selectedPaymentMethod === method.type && "active"].join(" ")}>
                                                    {method.type == "PAYPAL" ? (
                                                        <PayPalIcon />
                                                    ) : (
                                                        method.type == "STRIPE" ? (
                                                            <StripIcon />
                                                        ) : ""
                                                    )}

                                                    <input className="form-check-input" type="radio" checked={selectedPaymentMethod === method.type} onChange={() => {}} />
                                                </div>
                                            </div>
                                        })}

                                    </div>
                                    </>
                                )}

                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card border="light" className="mb-4 rounded-4 shadow-sm">
                            <Card.Title className="p-3 h5">ORDER SUMMARY</Card.Title>
                            <Card.Body className="p-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>{plan?.name} plan ({plan?.billing_cycle === "monthly" ? "Monthly" : "Yearly"})</span>
                                    <span>{settings?.CURRENCY_SYMBOL}{plan?.price}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <span>Tax:</span><span>+{settings?.CURRENCY_SYMBOL}0</span>
                                </div>
                                <hr />
                                <Card.Title>
                                    <div className="d-flex justify-content-between align-items-center mt-4">
                                        <span>Total Price:</span> <span>{settings?.CURRENCY_SYMBOL}{plan?.price}</span>
                                    </div>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                        <SuperButton onClick={handlePayment} className="btn btn-primary btn-lg btn-block" isLoading={isProcessingPayment} disabled={!selectedPaymentMethod}>Pay Now</SuperButton>

                        <Card border="light" className="mb-4 rounded-4 shadow-sm mt-4">
                            <Card.Body className="p-4">
                                <div className="row row-cols-2">
                                    <div className="col-2">
                                        <FontAwesomeIcon icon={faShieldHalved} className="display-5" />
                                    </div>
                                    <div className="col-10">
                                        <Card.Title className="h5">SSL PROTECTION.</Card.Title>
                                        <span className="text-muted">Your information is protected by 256-bit encryption.</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </section>
        </BasePage>
    )
}
