import { useDashboardSettings, useDemo } from "../../hooks"
import SectionLoading from "../../components/SectionLoading"
import PayPalSettings from "../../components/dashboard/PayPalSettings"
import StripeSettings from "../../components/dashboard/StripeSettings"


export default function PaymentMethodsPage()
{
    const { isDemo } = useDemo()
    const { isLoading, settings } = useDashboardSettings()


    if (isLoading || !Object.keys(settings).length)
    {
        return <SectionLoading center={true} />
    }

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
