import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import GoBackButton from "../GoBackButton";
import * as Yup from "yup"
import { toastFormikErrors } from "../../utils";
import SuperButton from "../SuperBotton";
import { AddCustomer } from "../../api/admin";
import { toast } from "react-toastify";


export default function CustomerAdd({ onGoBack })
{
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required."),
            email: Yup.string().required("Email is required.").email("Invalid email address!"),
            password: Yup.string().required("Password is required").min(6, "Password must be 6 characters or more.")
        }),
        onSubmit: (values, ) => {
            AddCustomer(values).then(({ data }) => {
                if (data.error === false) {
                    formik.resetForm()
                    toast.success(data.message)
                    return onGoBack()
                }
                return toast.error(data.message)
            }).catch(error => {
                toast.error(error.response.data.message)
            }).finally(() => {
                formik.setSubmitting(false)
            })
        }
    })


    return (
        <div className="row">
            <div className="col-6">
                <GoBackButton onClick={onGoBack} />

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" id="username" {...formik.getFieldProps("username")} />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email">Email:</label>
                        <input type="text" className="form-control" id="email" {...formik.getFieldProps("email")} />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" {...formik.getFieldProps("password")} />
                    </div>

                    <SuperButton isLoading={formik.isSubmitting} type="submit" className="btn btn-primary" onClick={() => toastFormikErrors(formik.errors)}><FontAwesomeIcon icon={faPlus} /> Add</SuperButton>
                </form>
            </div>
        </div>
    )
}
