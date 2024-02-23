import { useFormik } from "formik"
import { toast } from "react-toastify"
import * as Yup from "yup"
import SuperButton from "../../SuperButton"
import { sendTestEmail } from "../../../api/admin"
import { toastFormikErrors } from "../../../utils"


export default function SendTestEmailForm({ onSuccess })
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
                    if (typeof onSuccess === "function")
                        onSuccess()
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
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Enter your email address:</label>
                    <input type="text" id="email" className="form-control" {...formik.getFieldProps("email")} />
                </div>

            </form>
            <SuperButton type="submit" className="btn btn-primary float-end" isLoading={formik.isSubmitting} onClick={submitForm}>Send Test Email</SuperButton>
        </>
    )
}
