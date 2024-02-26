import PayPalSettings from "@components/dashboard/PayPalSettings"
import StripeSettings from "@components/dashboard/StripeSettings"
import { useDashboardSettings } from "@hooks"


export default function PaymentMethodsPage()
{
    const { settings } = useDashboardSettings()

    return (
        <>
            <h1 className="mb-5">Payment Gateways</h1>

            <div className="row">
                <div className="col-12 col-md-6">
                    <PayPalSettings settings={settings} />
                    <StripeSettings settings={settings} />
                </div>
            </div>

        </>
    )
}
