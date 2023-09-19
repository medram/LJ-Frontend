import paypalLogo from "@images/payment-gateways-icons/paypal.png"

export default function PayPalIcon({ ...rest }) {
    return <img src={paypalLogo} alt="PayPal" height={45} {...rest} />
}
