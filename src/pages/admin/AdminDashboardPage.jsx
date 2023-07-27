import { faDollarSign, faFile, faFileInvoiceDollar, faGem, faImages, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDashboardSettings } from '../../hooks';
import SectionLoading from '../../components/SectionLoading';
import { Card } from 'react-bootstrap';
import { useDashboardAnalytics } from '../../hooks/admin';
import { datetimeFormat } from '../../utils';


export default function AdminDashboardPage()
{
    const { isLoading: isSettingLoading, settings } = useDashboardSettings()
    const { isLoading: isAnalyticsLoading, analytics } = useDashboardAnalytics()

    if (isSettingLoading || isAnalyticsLoading || !Object.keys(analytics).length)
    {
        return <SectionLoading center={true} />
    }


    return <>
        <h1 className="mb-5">Dashboard</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-2 row-cols-xxl-3 g-3 mb-3">
            <div className="col">
                <div className="infobox bg-success text-light p-3 d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faDollarSign} size="4x" className="infobox-icon" />
                    </div>
                    <div className="p-3 d-flex flex-column flex-grow-1">
                        <span className="infobox-title h2">{settings.CURRENCY_SYMBOL}{analytics.total_revenue}</span>
                        <span className="infobox-desc">Total Revenue</span>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="infobox bg-primary text-light p-3 d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faUsers} size="4x" className="infobox-icon" />
                    </div>
                    <div className="p-3 d-flex flex-column flex-grow-1">
                        <span className="infobox-title h2">{analytics.customers_count}</span>
                        <span className="infobox-desc">Total Customers</span>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="infobox bg-info text-light p-3 d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faFile} className="infobox-icon" />
                    </div>
                    <div className="p-3 d-flex flex-column flex-grow-1">
                        <span className="infobox-title h2">{analytics.documents_count}</span>
                        <span className="infobox-desc">Uploaded Documents</span>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="infobox bg-warning p-3 d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faGem} size="4x" className="infobox-icon" />
                    </div>
                    <div className="p-3 d-flex flex-column flex-grow-1">
                        <span className="infobox-title h2">{analytics.active_subscriptions_count}</span>
                        <span className="infobox-desc">Total Active Subscription</span>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="infobox bg-primary text-light p-3 d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faGem} className="infobox-icon" />
                    </div>
                    <div className="p-3 d-flex flex-column flex-grow-1">
                        <span className="infobox-title h2">{analytics.subscriptions_count}</span>
                        <span className="infobox-desc">Total Subscriptions</span>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="infobox bg-primary text-light p-3 d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faFileInvoiceDollar} size="4x" className="infobox-icon" />
                    </div>
                    <div className="p-3 d-flex flex-column flex-grow-1">
                        <span className="infobox-title h2">{analytics.invoices_count}</span>
                        <span className="infobox-desc">Total Invoices</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="row mt-5">
            <div className="col">
                <Card className="mb-5">
                    <Card.Header className="card-title">Recent Customers</Card.Header>
                    <Card.Body className="overflow-auto">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Joined at</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics.recent_customers.map((customer, i) => (
                                    <tr key={i}>
                                        <td>{customer.id}</td>
                                        <td>
                                            <span>{customer.username}</span><br />
                                            <i className='text-muted'>{customer.email}</i>
                                        </td>
                                        <td>{datetimeFormat(customer.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </div>

            <div className="col-md-7">
                <Card>
                    <Card.Header className="card-title">Recent Subscriptions</Card.Header>
                    <Card.Body className="overflow-auto">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Plan</th>
                                    <th>Billing cycle</th>
                                    <th>Gateway</th>
                                    <th>Renew at</th>
                                    <th>Created at</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics.recent_subscriptions.map((subscription, i) => (
                                    <tr key={i}>
                                        <td>{subscription.id}</td>
                                        <td>{settings.CURRENCY_SYMBOL}{subscription.price}/{subscription.billing_cycle === "monthly" ? "month" : "year"}</td>
                                        <td>{subscription.payment_gateway === "PAYPAL" ? (
                                            <span className="badge rounded-pill bg-info">PayPal</span>
                                        ) : (
                                            <span className="badge rounded-pill bg-primary">Stripe</span>
                                        )}</td>
                                        <td>{datetimeFormat(subscription.expiring_at)}</td>
                                        <td>{datetimeFormat(subscription.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </div>

        </div>
    </>
}
