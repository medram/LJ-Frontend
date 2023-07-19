import { faFloppyDisk, faPlus, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import GeneralSettings from "../../components/dashboard/forms/GeneralSettings";
import { useDashboardSettings, useDemo } from "../../hooks";
import SectionLoading from "../../components/SectionLoading";
import SMTPSettings from "../../components/dashboard/forms/SMTPSettings";
import APISettings from "../../components/dashboard/forms/APISettings";


export function SettingsPage()
{
    const { isLoading: isDemoLoading, isDemo } = useDemo()
    const { isLoading, isError, error, settings } = useDashboardSettings()

    if (isLoading || !Object.keys(settings).length || isDemoLoading)
    {
        return <SectionLoading />
    }

    return (
        <>
            <h1 className="mb-3">Settings</h1>

            <div className="row">
                <div className="col-12">
                    <section className="bg-light rounded p-4">
                        <div className="d-flex align-items-start">
                            <div className="nav flex-column nav-pills me-5" style={{width: 200}} id="v-pills-tab" role="tablist" aria-orientation="vertical">

                                <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">General</button>

                                <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">SMTP</button>

                                <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">API settings</button>
                            </div>
                            <div className="tab-content" id="v-pills-tabContent" style={{width: "100%"}}>
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

                                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabIndex="0">

                                    <APISettings settings={settings} />

                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
