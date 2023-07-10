import { useFormik } from "formik"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import * as Yup from "yup"
import SuperButton from "../../SuperButton"
import { sendTestEmail } from "../../../api/admin"
import { toastFormikErrors } from "../../../utils"


export default function SendTestEmailModelForm({ show, onHide, setShow })
{
    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address.")
        }),
        onSubmit: ({ email }) => {
            sendTestEmail(email).then(data => {
                if (!data.errors) {
                    toast.success(data.message)
                    formik.resetForm()
                    setShow(!show)
                }
                else
                    toast.error(data.message)
            }).catch(err => {
                toast.error(err.message)
            }).finally(() => {
                formik.setSubmitting(false)
            })
        }
    })

    const submitForm = () => {
        formik.handleSubmit()
        toastFormikErrors(formik.errors)
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Send a Test Email Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Enter your email address:</label>
                        <input type="text" id="email" className="form-control form-control-lg" {...formik.getFieldProps("email")} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <SuperButton type="submit" className="btn btn-primary" isLoading={formik.isSubmitting} onClick={submitForm}>Send Test Email</SuperButton>
            </Modal.Footer>
        </Modal>
    )
}
