import PayPalIcon from '@components/icons/PayPalIcon';
import StripIcon from '@components/icons/StripIcon';
import { faComment, faDollarSign, faFile, faFileInvoiceDollar, faGem, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import { useDashboardSettings, useLCInfo } from '../../hooks';
import { useDashboardAnalytics } from '../../hooks/admin';
import { datetimeFormat } from '../../utils';


export default function AdminDashboardPage()
{
    const { isExtendedLicense: isEL } = useLCInfo()
    const { settings } = useDashboardSettings()
    const { analytics } = useDashboardAnalytics()

    return <>
        <h1 className="mb-5">Dashboard</h1>

        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-2 row-cols-xxl-3 g-3 mb-3">
            {isEL ? (
                <>
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
                                <FontAwesomeIcon icon={faComment} flip="horizontal" className="infobox-icon" />
                            </div>
                            <div className="p-3 d-flex flex-column flex-grow-1">
                                <span className="infobox-title h2">{analytics.documents_count}</span>
                                <span className="infobox-desc">Chat Rooms</span>
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
                </>
            ) : (
                <>
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
                        <div className="infobox bg-warning text-light p-3 d-flex">
                            <div className="d-flex justify-content-center align-items-center">
                                <FontAwesomeIcon icon={faComment} flip="horizontal" className="infobox-icon" />
                            </div>
                            <div className="p-3 d-flex flex-column flex-grow-1">
                                <span className="infobox-title h2">{analytics.documents_count}</span>
                                <span className="infobox-desc">Chat Rooms</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
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

            { isEL && (
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
                                            <td>
                                                {settings.CURRENCY_SYMBOL}{subscription.price}/{subscription.billing_cycle === "monthly" ? "month" : "year"}

                                                {!!subscription.is_free && (
                                                    <span className="badge text-bg-success m-1">Free</span>
                                                )}
                                            </td>
                                            <td>
                                                <>
                                                    {subscription.payment_gateway === "" && "-"}
                                                    {subscription.payment_gateway === "PAYPAL" ? (
                                                        <PayPalIcon height={25} />
                                                    ) : (subscription.payment_gateway === "STRIPE" &&
                                                        <StripIcon height={20} />
                                                    )}
                                                </>
                                            </td>
                                            <td>{datetimeFormat(subscription.expiring_at)}</td>
                                            <td>{datetimeFormat(subscription.created_at)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card.Body>
                    </Card>
                </div>
            )}

        </div>
    </>
}
