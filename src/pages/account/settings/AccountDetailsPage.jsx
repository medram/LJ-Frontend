import { useFormik } from "formik";
import { useUser } from "../../../hooks/auth";
import * as Yup from "yup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toastFormikErrors } from "../../../utils";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import SuperButton from "../../../components/SuperButton";
import { updateAccountDetails } from "../../../api/account";
import { toast } from "react-toastify";


export default function AccountDetailsPage()
{
    const { user, setUser } = useUser()

    const formik = useFormik({
        initialValues: {
            username: user.username,
            email: user.email
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required").min(4, "The username must be 4 characters or more.").max(20, "The username must be 4 characters or more (max 20 characters)!"),
            email: Yup.string().email("Invalid email address.")
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            updateAccountDetails(values).then((data) => {
                if (data?.errors) {
                    toast.error(data?.message)
                }
                else {
                    setUser(data.user)
                    toast.success(data.message)
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
            <h1 className="h3 mb-5">Profile</h1>

            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username">Username:</label>
                    <input type="text" className="form-control" placeholder="e.g. John" id="username" {...formik.getFieldProps("username")} />
                </div>

                <div className="mb-4">
                    <label htmlFor="email">Email:</label>
                    <input type="text" className="form-control" placeholder="e.g. john@gmail.com" id="email" {...formik.getFieldProps('email')} />
                </div>

                <SuperButton type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting} className="btn btn-primary" onClick={() => toastFormikErrors(formik.errors)}>
                    <FontAwesomeIcon icon={faFloppyDisk} /> Save
                </SuperButton>
            </form>
        </div>
    )
}
