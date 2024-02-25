import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { contactUs } from "../api";
import Heading from "../components/Heading";
import SuperButton from "../components/SuperButton";
import { toastFormikErrors } from "../utils";
import BasePage from "./layouts/BasePage";


export default function ContactPage() {

    const formik = useFormik({
        initialValues: {
            subject: "",
            email: "",
            message: ""
        },
        validationSchema: Yup.object({
            subject: Yup.string().required("The Subject is required")
                            .min(6, "The subject is too short!"),
            email: Yup.string().email("Invalid email address."),
            message: Yup.string().required("The message is required")
                            .min(20, "The message is too short.")
                            .max(512, "The message is very long.")
        }),
        onSubmit: (values) => {
            contactUs(values).then(data => {
                if (!data.errors) {
                    toast.success(data.message)
                    formik.resetForm()
                }
                else
                    toast.error(data.message)
            }).catch(err => {
                toast.error(err)
            }).finally(() => {
                formik.setSubmitting(false)
            })
        }
    })

    return (
        <BasePage>
            <Heading title="Contact Us" subTitle="Feel free reaching us any time."></Heading>
            <section className="container">
                <form onSubmit={formik.handleSubmit}>
                    <div className="row py-5">
                        <div className="col-md-5 m-auto p-5">
                            <div className="mb-3">
                                <label htmlFor="subject" className="form-label">Subject:</label>
                                <input type="subject" id="subject" className="form-control" {...formik.getFieldProps("subject")} autoComplete="off" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="text" id="email" className="form-control" {...formik.getFieldProps("email")} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message:</label>
                                <textarea id="message" className="form-control" rows={5} {...formik.getFieldProps("message")} />
                            </div>
                            <SuperButton type="submit" isLoading={formik.isSubmitting} className="btn btn-primary btn-block my-4" onClick={() => toastFormikErrors(formik.errors)}><FontAwesomeIcon icon={faPaperPlane} /> Send</SuperButton>
                        </div>
                    </div>
                </form>
            </section>
        </BasePage>
    )
}
