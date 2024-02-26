import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import SectionSuspense from "@/components/SectionSuspense";
import AvatarPalceholder from "@components/AvatarPalceholder";
import TablerIcon from "@components/TablerIcon";
import { faGem } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "@hooks/auth";
import { useLCInfo } from "@hooks/index";
import { IconFileDollar, IconInfoCircleFilled, IconLock, IconUser } from "@tabler/icons-react";
import { Link, Outlet, useLocation } from "react-router-dom";


export default function AccountSettingsLayout() {
    const { user } = useUser()
    const { isExtendedLicense } = useLCInfo()
    const location = useLocation()

    return (
        <section className="container py-5">
            {isExtendedLicense && (
                <div className="alert alert-info"><TablerIcon icon={IconInfoCircleFilled} /> You can chat with your documents through <Link to="/playground"><b>Playground</b></Link> section.</div>
            )}

            <div className="row my-5 gap-5">
                <div className="col-md-3 col-12">
                    <div className="list-group rounded">
                        <div className="list-group-item py-4 d-flex justify-content-center align-items-center flex-column" aria-current="true">
                            <AvatarPalceholder size={100} username={user.username} />
                            <b className="my-2">{user.username.slice(0, 1).toUpperCase() + user.username.slice(1)}</b>
                        </div>
                        <Link to="" className="list-group-item list-group-item-action py-3"><TablerIcon icon={IconUser} stroke={1.25} /> Profile</Link>

                        {isExtendedLicense && (
                            <>
                                <Link to="subscription" className="list-group-item list-group-item-action py-3"><FontAwesomeIcon icon={faGem} /> My Subscription</Link>

                                <Link to="invoices" className="list-group-item list-group-item-action py-3"><TablerIcon icon={IconFileDollar} stroke={1.25} /> Invoices</Link>
                            </>
                        )}

                        <Link to="change-password" className="list-group-item list-group-item-action py-3"><TablerIcon icon={IconLock} stroke={1.25} /> Change Password</Link>
                    </div>
                </div>
                <div className="col border rounded p-5 mx-3 overflow-auto">
                    <SectionErrorBoundary key={location.pathname}>
                        <SectionSuspense>
                            <Outlet />
                        </SectionSuspense>
                    </SectionErrorBoundary>
                </div>
            </div>
        </section>
    )
}
