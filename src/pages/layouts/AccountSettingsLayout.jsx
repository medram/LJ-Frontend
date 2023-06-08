import { Link, Outlet } from "react-router-dom";
import AvatarPalceholder from "../../components/AvatarPalceholder";
import { useUser } from "../../hooks/auth";


export default function AccountSettingsLayout() {
    const { user } = useUser()


    return (
        <section className="container py-5">
            <div className="row my-5">
                <div className="col-md-3 col-12">
                    <div className="list-group mb-5">
                        <div className="list-group-item list-group-item-action d-flex justify-content-center align-itmes-center" aria-current="true">
                            <AvatarPalceholder size={150} username={user.username} />
                        </div>
                        <Link to="" className="list-group-item list-group-item-action">Profile</Link>
                        <Link to="" className="list-group-item list-group-item-action">My Subscription</Link>
                        <Link to="" className="list-group-item list-group-item-action">Payment History</Link>
                        <Link to="" className="list-group-item list-group-item-action">Change Password</Link>
                    </div>
                </div>
                <div className="col">
                    <Outlet />
                </div>
            </div>
        </section>
    )
}
