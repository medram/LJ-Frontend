import SuperButton from "@components/SuperButton"
import { useFormik } from "formik"
import * as Yup from "yup"
import { toastFormikErrors } from "@utils"
import { sendPasswordResetEmail } from "@api/auth"
import { toast } from "react-toastify"
import { memo } from "react"


export default memo(function ForgotPasswordForm({ onEmailSent, setCurrentForm }) {
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
                    if (typeof onEmailSent === "function")
                        onEmailSent()
                    setCurrentForm("LOGIN")
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
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Enter your email address:</label>
                <input type="text" id="email" className="form-control" {...formik.getFieldProps("email")} />
            </div>
            <SuperButton type="submit" className="btn btn-primary float-end" isLoading={formik.isSubmitting} onClick={submitForm}>Reset Password</SuperButton>
        </form>
    )
})
