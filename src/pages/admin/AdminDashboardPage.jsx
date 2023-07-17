import { faDollarSign, faFile, faFileInvoiceDollar, faGem, faImages, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDashboardSettings } from '../../hooks';
import SectionLoading from '../../components/SectionLoading';
import { Card } from 'react-bootstrap';


export default function AdminDashboardPage()
{
    const { isLoading: isSettingLoading, settings } = useDashboardSettings()

    if (isSettingLoading)
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
                        <span className="infobox-title h2">{settings.CURRENCY_SYMBOL}263.00</span>
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
                        <span className="infobox-title h2">1528</span>
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
                        <span className="infobox-title h2">20155</span>
                        <span className="infobox-desc">Uploaded Documents</span>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="infobox bg-success text-light p-3 d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faGem} size="4x" className="infobox-icon" />
                    </div>
                    <div className="p-3 d-flex flex-column flex-grow-1">
                        <span className="infobox-title h2">345</span>
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
                        <span className="infobox-title h2">536</span>
                        <span className="infobox-desc">Total Invoices</span>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="infobox bg-info text-light p-3 d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faFile} className="infobox-icon" />
                    </div>
                    <div className="p-3 d-flex flex-column flex-grow-1">
                        <span className="infobox-title h2">20155</span>
                        <span className="infobox-desc">Uploaded Documents</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="row mt-5">
            <div className="col">
                <Card>
                    <Card.Header className="card-title">Recent Customers</Card.Header>
                    <Card.Body>
                        <table className="table table-striped">
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Joined at</th>
                            </tr>
                            <tr>
                                <td>54</td>
                                <td>Superman</td>
                                <td>5/21/2023, 9:44:39 PM</td>
                            </tr>
                            <tr>
                                <td>53</td>
                                <td>Batman</td>
                                <td>5/21/2023, 9:44:39 PM</td>
                            </tr>
                            <tr>
                                <td>52</td>
                                <td>Ironman</td>
                                <td>5/21/2023, 9:44:39 PM</td>
                            </tr>
                        </table>
                    </Card.Body>
                </Card>
            </div>

            <div className="col">
                <Card>
                    <Card.Header className="card-title">Recent Subscriptions</Card.Header>
                    <Card.Body>
                        <table className="table table-striped">
                            <tr>
                                <th>Plan</th>
                                <th>billing cycle</th>
                                <th>created at</th>
                            </tr>
                            <tr>
                                <td>Standard</td>
                                <td>$11.98/monthly</td>
                                <td>5/21/2023, 9:44:39 PM</td>
                            </tr>
                            <tr>
                                <td>Premium</td>
                                <td>$14.99/monthly</td>
                                <td>5/21/2023, 9:44:39 PM</td>
                            </tr>
                            <tr>
                                <td>Basic</td>
                                <td>$5/monthly</td>
                                <td>5/21/2023, 9:44:39 PM</td>
                            </tr>
                        </table>
                    </Card.Body>
                </Card>
            </div>

        </div>
    </>
}
