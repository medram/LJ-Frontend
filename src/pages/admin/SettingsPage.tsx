import GeneralSettings from "@components/dashboard/forms/GeneralSettings";
import SMTPSettings from "@components/dashboard/forms/SMTPSettings";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDashboardSettings, useDemo } from "@hooks/index";


export function SettingsPage()
{
    const { isDemo } = useDemo()
    const { settings } = useDashboardSettings()

    return (
        <>
            <h1 className="mb-3">Settings</h1>

            <div className="row">
                <div className="col-12">
                    <section className="bg-light rounded p-4">
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <div className="nav flex-column nav-pills me-5" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                                    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">General</button>

                                    <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">SMTP</button>

                                    {/* <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Others</button> */}
                                </div>
                            </div>
                            <div className="col">
                                <div className="d-flex align-items-start">
                                    <div className="tab-content" id="v-pills-tabContent" style={{ width: "100%" }}>
                                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0">

                                            <GeneralSettings settings={settings} />

                                        </div>

                                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="0">

                                            {isDemo ? (
                                                <div className="alert alert-warning"><FontAwesomeIcon icon={faTriangleExclamation} /> This section is disabled on the demo mode due to sensitive data!</div>
                                            ) : (
                                                <SMTPSettings settings={settings} />
                                            )}

                                        </div>

                                        {/* <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabIndex="0">

                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit deserunt, accusantium assumenda omnis voluptate, in, cumque facere recusandae incidunt perferendis quo nisi cupiditate molestias. Mollitia voluptatem laudantium quos corrupti quibusdam!

                                        </div> */}

                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </>
    )
}
