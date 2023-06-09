import SectionLoading from "../../../components/SectionLoading"
import { useSettings } from "../../../hooks"
import { useUserInvoices } from "../../../hooks/account"
import { datetimeFormat } from "../../../utils"

export default function InvoicesPage()
{
    const { isLoading, invoices } = useUserInvoices()
    const { settings } = useSettings()


    if (isLoading)
    {
        return <SectionLoading center={true} />
    }


    return (
        <div>
            <h1 className="h3 pb-5">Invoices</h1>

            <table className="table">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>status</th>
                        <th>amount</th>
                        <th>gateway</th>
                        <th>paid at</th>
                        <th>created at</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices?.map((invoice, i) => {
                        return (
                            <tr key={i}>
                                <td>{invoice.invoice_id}</td>
                                <td>{invoice.paid_at ? (
                                    <span className="badge text-bg-success">paid</span>
                                ) : (
                                    <span className="badge text-bg-warning">not paid</span>
                                )}</td>
                                <td>{settings.CURRENCY_SYMBOL}{invoice.price}</td>
                                <td>{invoice.payment_gateway}</td>
                                <td>{invoice.paid_at ? datetimeFormat(invoice.paid_at) : "-"}</td>
                                <td>{datetimeFormat(invoice.created_at)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
