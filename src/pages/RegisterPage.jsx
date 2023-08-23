import { useFormik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SuperButton from "../components/SuperButton";
import Switch from "../components/Switch";
import * as Yup from "yup"
import BasePage from "./layouts/BasePage";
import { toastFormikErrors } from "../utils";
import register from "../api/auth";
import { toast } from "react-toastify";
import PasswordInput from "../components/PasswordInput";


export default function RegisterPage() {
    const navigate = useNavigate()
    const [ searchParams ] = useSearchParams()
    const redirectTo = searchParams.get('to')

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            accept: false
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username required.").min(4, "Username must be 4 characters or more."),
            email: Yup.string().required("Email required.").email("Invalid email."),
            password: Yup.string().required("Password required.").min(6, "Password must be 6 characters or more."),
            accept: Yup.boolean().required().oneOf([true], "You must accept the terms and conditions.")
        }),
        onSubmit: (values) => {
            register(values).then(({ data }) => {
                if (data.error === false)
                {
                    formik.resetForm()
                    toast.success(data.message, {
                        autoClose: 10000
                    })
                    if (redirectTo)
                        return navigate(`/login?to=${redirectTo}`)
                    else
                        return navigate('/login')
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
        <BasePage>
            <section className="container">
                <div className="row my-5 py-5">
                    <div className="col-md-5 m-auto p-5">
                        <h1 className="text-center">Sign Up</h1>
                        <span className="text-muted d-block text-center mb-5">Create a new account</span>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username:</label>
                                <input type="text" id="username" className="form-control" {...formik.getFieldProps("username")} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" id="email" className="form-control" {...formik.getFieldProps("email")} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>

                                <PasswordInput id="password" className="form-control" placeholder="+6 character or more" skipDemoMode {...formik.getFieldProps("password")} />
                            </div>
                            <div className="d-flex mb-3">
                                <Switch onChange={(checked) => formik.setFieldValue("accept", checked)} name="accept" checked={formik.values.accept} size="small" className="mx-2 mt-1" />

                                <label htmlFor="accept" className="form-label" onClick={() => formik.setFieldValue("accept", !formik.values.accept)} >I read and accept terms of use & privacy policy of the website.</label>
                            </div>

                            <SuperButton type="submit" isLoading={formik.isSubmitting} disabled={!formik.values.accept || !formik.values.username || !formik.values.email || !formik.values.password || formik.isSubmitting} onClick={() => toastFormikErrors(formik.errors)} className="btn btn-primary btn-block my-4">Sign Up</SuperButton>
                        </form>
                    </div>
                </div>
            </section>
        </BasePage>
    )
}
