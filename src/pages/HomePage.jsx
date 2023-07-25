import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BasePage from "./layouts/BasePage";
import { faBook, faBookOpenReader, faCircleQuestion, faClockRotateLeft, faCloudArrowUp, faCommentDots, faGraduationCap, faHourglass2, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

export default function HomePage()
{
    return (
        <BasePage>
            <section className="container-fluid jumbotron">
                <div className="container py-5">
                    <div className="row flex-column-reverse flex-md-row">
                        <div className="col-md-6 col-sm-12  text-center text-md-start left-side">
                            <h1>Chat Directly with Your <span className="text-gradient-primary">Documents</span>, Powered by AI.</h1>

                            <p>Come together with millions of students, researchers, and professionals to rapidly respond to questions and comprehend research with AI.</p>

                            <a href="/playground" className="btn btn-primary btn-lg mt-5"><FontAwesomeIcon icon={faCloudArrowUp} /> Try it now</a>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="right-side">
                                <img src="https://i.imgur.com/4yhmvkY.png" alt="searching within documents image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container-fluid">
                <div className="container py-5 text-center">
                    <h2 className="section-title">What does it include?</h2>
                    <span className="section-sub-title">AskPDF includes the following features</span>

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
                                    The AskPDF chat bot remembers the chat history of the conversation.
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
                    <span className="section-sub-title">AskPDF is a useful tool for everyone that seeks knowledge.</span>

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
                                    AskPDF is convenient for lazy people that don't want to read a lot of content.
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="feature">
                                <div className="feature-header"><FontAwesomeIcon icon={faHourglass2} /> Whom don't have time</div>
                                <div className="feature-body">
                                    AskPDF is great for people that don't have much time to go through pages of content to look up information.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </BasePage>
    )
}
