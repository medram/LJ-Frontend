import stripeLogo from "@images/payment-gateways-icons/stripe.png"

export default function StripIcon({ ...rest })
{
    return <img src={stripeLogo} alt="Stripe" height={45} {...rest} />
}
