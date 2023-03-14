import Heading from "../components/Heading";
import BasePage from "./layouts/BasePage";


export default function ContactPage() {
    return (
        <BasePage>
            <Heading title="Contact Us" subTitle="Feel free reaching us any time."></Heading>
            <section className="container">
                <div className="row py-5">
                    <div className="col-md-5 m-auto p-5">
                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">Subject:</label>
                            <input type="subject" id="subject" className="form-control form-control-lg" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" id="email" className="form-control form-control-lg" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message:</label>
                            <textarea id="message" className="form-control form-control-lg" rows={5} />
                        </div>
                        <button className="btn btn-primary btn-lg btn-block my-4">Send to us</button>
                    </div>
                </div>
            </section>
        </BasePage>
    )
}
