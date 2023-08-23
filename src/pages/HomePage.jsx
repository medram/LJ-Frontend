import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BasePage from "./layouts/BasePage";
import { faBook, faBookOpenReader, faCircleQuestion, faClockRotateLeft, faCloudArrowUp, faCommentDots, faGraduationCap, faHourglass2, faPeopleGroup, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSettings } from "../hooks";
import Dropzone from "@components/Dropzone";
import SpinnerGrow from "@components/SpinnerGrow";
import TablerIcon from "@components/TablerIcon";
import { IconCloudUpload } from "@tabler/icons-react";
import { useState } from "react";
import { useModel } from "@hooks/templates";
import LoginRegisterForms from "@components/forms/LoginRegisterForms";
import { useUser } from "@hooks/auth";
import { useNavigate } from "react-router";


export default function HomePage()
{
    const { settings } = useSettings()
    const [isProcessing, setIsProcessing] = useState(false)
    const { isOpen, open, close, toggle, Model: RegisterModel } = useModel()
    const { isAuthenticated } = useUser()
    const navigate = useNavigate()

    const onUpload = ({ resetDropzone }) => {
        resetDropzone()

        if (isAuthenticated)
            return navigate("/playground")
        else
            open()
    }

    const onError = () => {

    }

    return (
        <BasePage>
            <section className="container-fluid jumbotron">
                <div className="container py-5">
                    <div className="row flex-column align-items-center justify-content-center">
                        <div className="col-md-7 col-sm-12  text-center mb-5 top-side">
                            <h1 className="mb-3">Chat Directly with Your <span className="text-gradient-primary">Documents</span>, Powered by AI.</h1>

                            <p>Come together with millions of students, researchers, and professionals to rapidly respond to questions and comprehend research with AI.</p>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="bottom-side">
                                <div className="w-100">
                                    <Dropzone onUpload={onUpload} onError={onError} name="pdf-file"
                                        extraOnUploadProps={{

                                        }} dropzoneOptions={{
                                            accept: { 'application/pdf': ['.pdf'] },
                                            maxSize: 50 * 1024 * 1024, // (in bytes) 50 MB
                                        }} >
                                        {isProcessing ? (
                                            <div className="text-center">
                                                <b><SpinnerGrow size="sm" /> Processing...</b>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <b><TablerIcon icon={IconCloudUpload} size={40} /><br /> Upload you PDF</b>
                                                <p>(Drag & Drop)</p>
                                            </div>
                                        )}
                                    </Dropzone>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container-fluid">
                <div className="container py-5 text-center">
                    <h2 className="section-title">What does it include?</h2>
                    <span className="section-sub-title">{settings?.SITE_NAME} includes the following features</span>

                    <div className="row align-items-stretch">

                        <div className="col">
                            <div className="feature">
                                <div className="feature-header"><FontAwesomeIcon icon={faCommentDots} /> Chat with your Documents</div>
                                <div className="feature-body">
                                    Upload your document then start interacting with it immediately.
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="feature">
                                <div className="feature-header"><FontAwesomeIcon icon={faCircleQuestion} /> Quick starting questions</div>
                                <div className="feature-body">
                                    Upload your document and start asking questions right away.
                                </div>
                            </div>
                        </div>
                        <div className="col">

                            <div className="feature">
                                <div className="feature-header"><FontAwesomeIcon icon={faClockRotateLeft} /> Chat history</div>
                                <div className="feature-body">
                                    The {settings?.SITE_NAME} chat bot remembers the chat history of the conversation.
                                </div>
                            </div>
                        </div>
                            <div className="col">

                            <div className="feature">
                                <div className="feature-header"><FontAwesomeIcon icon={faBook} /> Summarization</div>
                                <div className="feature-body">
                                    summarize your document the quick way.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container-fluid blue-section">
                <div className="container py-5 text-center">
                    <h2 className="section-title">Useful to Whom?</h2>
                    <span className="section-sub-title">{settings?.SITE_NAME} is a useful tool for everyone that seeks knowledge.</span>

                    <div className="row align-items-stretch">

                        <div className="col">
                            <div className="feature">
                                <div className="feature-header"><FontAwesomeIcon icon={faGraduationCap} /> Students</div>
                                <div className="feature-body">
                                    Help students study efficently by looking up information quickly through chating with their documents.
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="feature">
                                <div className="feature-header"><FontAwesomeIcon icon={faBookOpenReader} /> Researchers</div>
                                <div className="feature-body">
                                    Keep researchers up-to-date with the latest studies/papers.
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="feature">
                                <div className="feature-header"><FontAwesomeIcon icon={faPeopleGroup} /> Lazy People</div>
                                <div className="feature-body">
                                    {settings?.SITE_NAME} is convenient for lazy people that don't want to read a lot of content.
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="feature">
                                <div className="feature-header"><FontAwesomeIcon icon={faHourglass2} /> Whom don't have time</div>
                                <div className="feature-body">
                                    {settings?.SITE_NAME} is great for people that don't have much time to go through pages of content to look up information.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <RegisterModel title="Please Login to continue">
                <LoginRegisterForms onLoginRedirectTo="/playground" />
            </RegisterModel>
        </BasePage>
    )
}
