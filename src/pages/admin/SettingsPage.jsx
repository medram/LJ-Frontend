import { faFloppyDisk, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import GeneralSettings from "../../components/dashboard/GeneralSettings";


export function SettingsPage()
{
    return (
        <>
            <h1 className="mb-3">Settings</h1>

            <div className="row">
                <div className="col-12">
                    <section className="bg-light rounded p-4">
                        <div className="d-flex align-items-start">
                            <div className="nav flex-column nav-pills me-5" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">General</button>
                                <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">SMTP</button>
                                <button className="nav-link" id="v-pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#v-pills-disabled" type="button" role="tab" aria-controls="v-pills-disabled" aria-selected="false" disabled>Disabled</button>
                                <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button>
                                <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</button>
                            </div>
                            <div className="tab-content" id="v-pills-tabContent" style={{width: "100%"}}>
                                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0">

                                    <GeneralSettings />

                                </div>

                                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="0">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id accusantium blanditiis minus ad. Numquam sint iusto assumenda vero quae minima enim fugiat ducimus neque! Consequuntur totam ab at incidunt. Voluptates!</div>
                                <div className="tab-pane fade" id="v-pills-disabled" role="tabpanel" aria-labelledby="v-pills-disabled-tab" tabIndex="0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus beatae itaque cum suscipit temporibus commodi autem deleniti quis? Esse tempora voluptas quis aliquam atque ducimus dolores suscipit. Libero nobis hic dignissimos natus nulla inventore repellendus delectus, enim similique maiores consectetur doloremque quaerat explicabo voluptatibus eos, tempore quas deserunt modi. Qui aperiam quis amet dolorum sed minima officiis obcaecati eum, tempora nihil placeat veniam debitis accusamus tempore quod iure. Veniam nam in minus quos, dolores placeat maiores porro et aut deleniti dicta eius esse nihil possimus autem, voluptates consequatur sapiente consequuntur quisquam pariatur rem est ipsa adipisci quis. Sint, nihil expedita.</div>
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
