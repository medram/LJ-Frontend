import { faDollarSign, faImages, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function AdminDashboardPage()
{
    return <>
        <h1 className="mb-5">Dashboard</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-2 row-cols-xxl-3 g-3 mb-3">
            <div className="col">
                <div className="infobox bg-success text-light p-3 d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faDollarSign} size="4x" className="infobox-icon" />
                    </div>
                    <div className="p-3 d-flex flex-column flex-grow-1">
                        <span className="infobox-title h2">$263.00</span>
                        <span className="infobox-desc">Total reventue</span>
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
                        <span className="infobox-desc">Total customers</span>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="infobox bg-info text-light p-3 d-flex">
                    <div className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faImages} className="infobox-icon" />
                    </div>
                    <div className="p-3 d-flex flex-column flex-grow-1">
                        <span className="infobox-title h2">20155</span>
                        <span className="infobox-desc">Total images</span>
                    </div>
                </div>
            </div>
        </div>
    </>
}
