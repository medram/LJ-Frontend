import { sendPasswordResetEmail } from "@api/auth"
import { toastFormikErrors } from "@utils/index"
import { useFormik } from "formik"
import { Modal } from "react-bootstrap"
import { toast } from "react-toastify"
import * as Yup from "yup"
import SuperButton from "./SuperButton"


type ForgotPasswordModelProps = {
    show: boolean,
    onHide: () => void,
    setShow: (status: boolean) => void
}

export default function ForgotPasswordModel({ show=false, onHide, setShow }: ForgotPasswordModelProps)
{
    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address.")
        }),
        onSubmit: ({ email }) => {
            sendPasswordResetEmail(email).then(data => {
                if (!data.errors) {
                    toast.success(data.message)
                    formik.resetForm()
                    setShow(!show)
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

    const submitForm = () => {
        formik.handleSubmit()
        toastFormikErrors(formik.errors)
    }


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Forgot Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Enter your email address:</label>
                        <input type="text" id="email" className="form-control" {...formik.getFieldProps("email")} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <SuperButton type="submit" className="btn btn-primary" isLoading={formik.isSubmitting} onClick={submitForm}>Reset Password</SuperButton>
            </Modal.Footer>
        </Modal>
    )
}
