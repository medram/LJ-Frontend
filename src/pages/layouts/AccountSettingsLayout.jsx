import { Link, Outlet } from "react-router-dom";
import AvatarPalceholder from "../../components/AvatarPalceholder";
import { useUser } from "../../hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faReceipt, faStar, faUser } from "@fortawesome/free-solid-svg-icons";


export default function AccountSettingsLayout() {
    const { user } = useUser()


    return (
        <section className="container py-5">
            <div className="row my-5 gap-5">
                <div className="col-md-3 col-12">
                    <div className="list-group">
                        <div className="list-group-item py-4 d-flex justify-content-center align-items-center flex-column" aria-current="true">
                            <AvatarPalceholder size={100} username={user.username} />
                            <b className="my-2">{user.username.slice(0, 1).toUpperCase() + user.username.slice(1)}</b>
                        </div>
                        <Link to="" className="list-group-item list-group-item-action"><FontAwesomeIcon icon={faUser} /> Profile</Link>
                        <Link to="subscription" className="list-group-item list-group-item-action"><FontAwesomeIcon icon={faStar} /> My Subscription</Link>
                        <Link to="invoices" className="list-group-item list-group-item-action"><FontAwesomeIcon icon={faReceipt} /> Invoices</Link>
                        <Link to="change-password" className="list-group-item list-group-item-action"><FontAwesomeIcon icon={faLock} /> Change Password</Link>
                    </div>
                </div>
                <div className="col border rounded p-5 mx-3">
                    <Outlet />
                </div>
            </div>
        </section>
    )
}
