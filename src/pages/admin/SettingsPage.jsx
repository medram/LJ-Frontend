import { faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import GeneralSettings from "../../components/dashboard/GeneralSettings";
import { useDashboardSettings } from "../../hooks";
import SectionLoading from "../../components/SectionLoading";
import SMTPSettings from "../../components/dashboard/SMTPSettings";


export function SettingsPage()
{
    const { isLoading, isError, error, settings } = useDashboardSettings()

    if (isLoading || !Object.keys(settings).length)
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
                                <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Email Templates</button>
                                <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</button>
                            </div>
                            <div className="tab-content" id="v-pills-tabContent" style={{width: "100%"}}>
                                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0">

                                    <GeneralSettings settings={settings} />

                                </div>

                                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="0">

                                    <SMTPSettings settings={settings} />

                                </div>

                                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabIndex="0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex, ab repellat quam perferendis in et similique veritatis. Eveniet illum cumque, cum totam enim expedita recusandae illo animi architecto magnam similique, nesciunt ad deleniti mollitia delectus modi non aliquid optio facere inventore pariatur eligendi quidem in exercitationem? Accusamus totam ducimus illum!</div>

                                <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabIndex="0">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate quas asperiores ipsa sequi. Doloribus sapiente porro eligendi cum laboriosam sed..</div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
