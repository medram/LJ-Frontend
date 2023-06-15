import { useNavigate, useParams } from "react-router-dom";
import BasePage from "./layouts/BasePage";
import SuperButton from "../components/SuperButton";
import { useFormik } from "formik";
import * as Yup from "yup"
import { toastFormikErrors } from "../utils";
import { sendResetPassword } from "../api/auth";
import { toast } from "react-toastify";


export default function ResetPasswordPage()
{
    const { token } = useParams()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            token: token,
            new_password: "",
            new_password_confirmation: ""
        },
        validationSchema: Yup.object({
            token: Yup.string().required("Token is required!"),
            new_password: Yup.string().min(8, "Password must be 8 characters or higher.")
                                    .max(40, "The password must be 40 characters at max."),
            new_password_confirmation: Yup.string().required("Confirmed Password is required.").oneOf([Yup.ref('new_password')], 'Passwords must match')
        }),
        onSubmit: (values) => {
            sendResetPassword(values).then(data => {
                if (!data.errors) {
                    toast.success(data.message)
                    formik.resetForm()
                    return navigate("/login", { replace: true })
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
            <section className="container">
                <div className="row my-5 py-5">
                    <div className="col-md-5 m-auto p-5">
                        <h1 className="text-center mb-5">Reset Password</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="new_password" className="form-label">New password:</label>
                                <input type="text" {...formik.getFieldProps("new_password")} id="new_password" className="form-control form-control-lg" placeholder="+8 characters" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="new_password_confirmation" className="form-label">Confirm new password:</label>
                                <input type="password" {...formik.getFieldProps("new_password_confirmation")} id="new_password_confirmation" className="form-control form-control-lg" placeholder="+8 characters" />
                            </div>

                            <SuperButton isLoading={formik.isSubmitting} onClick={() => toastFormikErrors(formik.errors)} className="btn btn-primary btn-lg btn-block my-4" type="submit" disabled={!formik.isValid} >Update Password</SuperButton>
                        </form>
                    </div>
                </div>
            </section>
        </BasePage>
    )
}
