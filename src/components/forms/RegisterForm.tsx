import { useFormik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup"
import { toast } from "react-toastify";

import { toastFormikErrors } from "@utils";
import register from "@api/auth";
import Switch from "@components/Switch";
import SuperButton from "@components/SuperButton";
import PasswordInput from "@components/PasswordInput";
import { memo } from "react";


export default memo(function RegisterForm({ onRegister, setCurrentForm, onRegisterRedirectTo })
{
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const redirectTo = onRegisterRedirectTo ? onRegisterRedirectTo : searchParams.get('to')

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

                    if (typeof onRegister === "function")
                        onRegister(values, setCurrentForm)

                    if (redirectTo)
                        return navigate(redirectTo)

                    return setCurrentForm("LOGIN")
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
        <div>
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
    )
})
