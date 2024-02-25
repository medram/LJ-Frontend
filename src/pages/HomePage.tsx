import Dropzone from "@components/Dropzone";
import SpinnerGrow from "@components/SpinnerGrow";
import TablerIcon from "@components/TablerIcon";
import { MotionItem, MotionViewport } from "@components/animations";
import { useUser } from "@hooks/auth";
import { useLoginRegister } from "@hooks/templates";
import { IconBook, IconBrandHipchat, IconCloudUpload, IconFileSearch, IconHistory, IconHourglassHigh, IconSchool, IconUsersGroup, IconZoomQuestion } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSettings } from "../hooks";
import BasePage from "./layouts/BasePage";


export default function HomePage()
{
    const { settings } = useSettings()
    const [isProcessing, setIsProcessing] = useState(false)
    const { isOpen, open, close, LoginRegisterModel } = useLoginRegister()

    const { isAuthenticated } = useUser()
    const navigate = useNavigate()

    const onUpload = ({ resetDropzone }: {resetDropzone: () => void}) => {
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
                    <MotionViewport>
                    <div className="row flex-column align-items-center justify-content-center">
                        <div className="col-md-7 col-sm-12  text-center mb-5 top-side">
                            <MotionItem>
                                <h1 className="mb-3">Chat Directly with Your <span className="text-gradient-primary">Documents</span>, Powered by AI.</h1>

                                <p>Come together with millions of students, researchers, and professionals to rapidly respond to questions and comprehend research with AI.</p>
                            </MotionItem>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <MotionItem>
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
                                                    <b><TablerIcon icon={IconCloudUpload} size={40} /><br /> Upload you Document to chat with.</b><br />
                                                    <small>(pdf, csv, docx, xlsx, txt, json, pptx, epub)</small>
                                                    <p>(Drag & Drop)</p>
                                                </div>
                                            )}
                                        </Dropzone>
                                    </div>
                                </div>
                            </MotionItem>
                        </div>
                    </div>
                    </MotionViewport>
                </div>
            </section>

            <section className="container-fluid section blue-section">
                <div className="container py-5 text-center">
                    <MotionViewport>
                        <MotionItem>
                            <h2 className="section-title">What does it include?</h2>
                            <span className="section-sub-title">{settings?.SITE_NAME} includes the following features</span>
                        </MotionItem>

                        <div className="row align-items-stretch">
                            <div className="col">
                                <MotionItem>
                                    <div className="feature">
                                        <div className="feature-header"><TablerIcon icon={IconBrandHipchat} size={40} /> Chat with your Documents</div>
                                        <div className="feature-body">
                                            Upload your document then start interacting with it immediately.
                                        </div>
                                    </div>
                                </MotionItem>
                            </div>
                            <div className="col">
                                <MotionItem>
                                    <div className="feature">
                                        <div className="feature-header"><TablerIcon icon={IconZoomQuestion} size={40} /> Quick starting questions</div>
                                        <div className="feature-body">
                                            Upload your document and start asking questions right away.
                                        </div>
                                    </div>
                                </MotionItem>
                            </div>
                            <div className="col">
                                <MotionItem>
                                    <div className="feature">
                                        <div className="feature-header"><TablerIcon icon={IconHistory} size={40} /> Chat history</div>
                                        <div className="feature-body">
                                            The {settings?.SITE_NAME} chat bot remembers the chat history of the conversation.
                                        </div>
                                    </div>
                                </MotionItem>
                            </div>
                            <div className="col">
                                <MotionItem>
                                    <div className="feature">
                                        <div className="feature-header"><TablerIcon icon={IconFileSearch} size={40} /> Summarization</div>
                                        <div className="feature-body">
                                            summarize your documents the quick way.
                                        </div>
                                    </div>
                                </MotionItem>
                            </div>
                        </div>
                    </MotionViewport>
                </div>
            </section>

            <section className="container-fluid section">
                <div className="container py-5 text-center">
                    <MotionViewport>
                        <h2 className="section-title">Useful to Whom?</h2>
                        <span className="section-sub-title">{settings?.SITE_NAME} is a useful tool for everyone that seeks knowledge.</span>

                        <div className="row align-items-stretch">

                            <div className="col">
                                <MotionItem>
                                    <div className="feature">
                                        <div className="feature-header"><TablerIcon icon={IconSchool} size={40} /> Students</div>
                                        <div className="feature-body">
                                            Help students study efficently by looking up information quickly through chating with their documents.
                                        </div>
                                    </div>
                                </MotionItem>
                            </div>
                            <div className="col">
                                <MotionItem>
                                    <div className="feature">
                                        <div className="feature-header"><TablerIcon icon={IconBook} size={40} /> Researchers</div>
                                        <div className="feature-body">
                                            Keep researchers up-to-date with the latest studies/papers.
                                        </div>
                                    </div>
                                </MotionItem>
                            </div>
                            <div className="col">
                                <MotionItem>
                                    <div className="feature">
                                        <div className="feature-header"><TablerIcon icon={IconUsersGroup} size={40} /> Lazy People</div>
                                        <div className="feature-body">
                                            {settings?.SITE_NAME} is convenient for lazy people that don't want to read a lot of content.
                                        </div>
                                    </div>
                                </MotionItem>
                            </div>
                            <div className="col">
                                <MotionItem>
                                    <div className="feature">
                                        <div className="feature-header"><TablerIcon icon={IconHourglassHigh} size={40} /> Who don't have time</div>
                                        <div className="feature-body">
                                            {settings?.SITE_NAME} is great for people that don't have much time to go through pages of content to look up information.
                                        </div>
                                    </div>
                                </MotionItem>
                            </div>
                        </div>
                    </MotionViewport>
                </div>
            </section>

            <LoginRegisterModel
                title="Please Sign-in to continue"
                onLoginRedirectTo="/playground"
            />
        </BasePage>
    )
}
