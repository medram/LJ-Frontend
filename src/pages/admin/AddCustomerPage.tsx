import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { AddCustomer } from "../../api/admin";
import GoBackButton from "../../components/GoBackButton";
import PasswordInput from "../../components/PasswordInput";
import SuperButton from "../../components/SuperButton";
import Switch from "../../components/Switch";
import { toastFormikErrors } from "../../utils";


export default function AddCustomerPage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            is_active: false
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required."),
            email: Yup.string().required("Email is required.").email("Invalid email address!"),
            password: Yup.string().required("Password is required").min(6, "Password must be 6 characters or more.")
        }),
        onSubmit: (values,) => {
            AddCustomer(values).then((data) => {
                if (data.errors === false) {
                    formik.resetForm()
                    toast.success(data.message)
                    queryClient.invalidateQueries('admin.customers')
                    return navigate(-1)
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
        <>
            <h1 className="mb-3">Add Customer</h1>
            <div className="row">
                <div className="col-md-6">
                    <GoBackButton />
                    <section className="bg-light rounded text-bg-light p-4">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username">Username:</label>
                                <input type="text" className="form-control" placeholder="e.g. John" id="username" {...formik.getFieldProps("username")} />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email">Email:</label>
                                <input type="text" className="form-control" id="email" placeholder="e.g. john@gmail.com" {...formik.getFieldProps("email")} />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password">Password:</label>
                                <PasswordInput className="form-control" id="password" {...formik.getFieldProps("password")} />
                            </div>

                            <div className="d-flex mb-3">
                                <Switch onChange={(checked) => formik.setFieldValue("is_active", checked)} name="accept" checked={formik.values.is_active} size="small" className="mx-2 mt-1" />

                                <label htmlFor="is_active" className="form-label" onClick={() => formik.setFieldValue("is_active", !formik.values.is_active)} >Active</label>
                            </div>

                            <SuperButton isLoading={formik.isSubmitting} type="submit" className="btn btn-primary" onClick={() => toastFormikErrors(formik.errors)}><FontAwesomeIcon icon={faPlus} /> Add</SuperButton>
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}
