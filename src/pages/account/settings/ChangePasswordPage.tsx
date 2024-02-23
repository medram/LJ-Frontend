import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useFormik } from "formik"
import { toastFormikErrors } from "../../../utils"
import SuperButton from "../../../components/SuperButton"
import * as Yup from "yup"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import { updateUserPassword } from "../../../api/account"
import { useDemo } from "../../../hooks"



export default function ChangePasswordPage()
{
    const { isDemo } = useDemo()
    const formik = useFormik({
        initialValues: {
            current_password: "",
            new_password: "",
            confirm_new_password: ""
        },
        validationSchema: Yup.object({
            current_password: Yup.string()
                                .required("Current Password field is required"),
            new_password: Yup.string()
                            .required("New Password field is required")
                            .min(8, "New Password must be 8 characters or higher"),
            confirm_new_password: Yup.string()
                                    .required("Confirm New Password field is required")
                                    .min(8, "New Password must be 8 characters or higher")
                                    .oneOf([Yup.ref('new_password')], 'Passwords must match')
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            if (isDemo)
                return toast.success("This action isn't allowed on the demo mode!")

            updateUserPassword(values).then((data) => {
                if (data?.errors) {
                    toast.error(data?.message)
                }
                else {
                    toast.success(data.message)
                    formik.resetForm()
                }
            }).catch(err => {
                toast.error(err)
            }).finally(() => {
                formik.setSubmitting(false)
            })
        }
    })


    return (
        <div>
            <h1 className="h3 pb-5">Change Password</h1>

            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="current_password">Current Password:</label>
                    <input type="password" className="form-control" placeholder="+8 characters" id="current_password" {...formik.getFieldProps("current_password")} />
                </div>

                <div className="mb-4">
                    <label htmlFor="new_password">New Password:</label>
                    <input type="password" className="form-control" placeholder="+8 characters" id="new_password" {...formik.getFieldProps("new_password")} />
                </div>

                <div className="mb-4">
                    <label htmlFor="confirm_new_password">Confirm new password:</label>
                    <input type="password" className="form-control" placeholder="+8 characters" id="confirm_new_password" {...formik.getFieldProps("confirm_new_password")} />
                </div>

                <SuperButton type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting} className="btn btn-primary" onClick={() => toastFormikErrors(formik.errors)}>
                    <FontAwesomeIcon icon={faFloppyDisk} /> Update Password
                </SuperButton>
            </form>
        </div>
    )
}
