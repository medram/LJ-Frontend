import { useFormik } from "formik";
import { memo, useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify"

import * as Yup from "yup"

import SuperButton from "@components/SuperButton";
import { useAuth } from "@hooks/auth";
import { toastFormikErrors } from "@utils";
import ForgotPasswordForm from "@components/ForgotPasswordModel";
import { useDemo } from "@hooks";


export default memo(function LoginForm({ onLogin, setCurrentForm, onLoginRedirectTo })
{
    const { isDemo } = useDemo()
    const { Authenticate } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const redirectTo = onLoginRedirectTo ? onLoginRedirectTo : searchParams.get('to')

    // To show forget password form
    const [show, setShow] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: isDemo ? "admin@test.com" : "",
            password: isDemo ? "123456" : ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address.").required("Email Required."),
            password: Yup.string().required("Password required.")
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            Authenticate(values.email, values.password).then(data => {
                if (!data.errors) {
                    toast.success(data.message)
                    if (typeof onLogin === "function")
                        onLogin(values.email, setCurrentForm)

                    if (redirectTo)
                        return navigate(redirectTo)
                }
                else
                    toast.error(data.message)
            }).finally(() => {
                formik.setSubmitting(false)
            })
        }
    });

    const onClickSignIn = useCallback(() => {
        toastFormikErrors(formik.errors)
    }, [])


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="text" {...formik.getFieldProps("email")} id="email" className="form-control" />
                </div>
                <div className="mb-3">
                    <div>
                        <label htmlFor="password" className="form-label">Password:</label>
                        <Link onClick={() => setCurrentForm("FORGOT_PASSWORD")} className="float-end">Forgot password?</Link>
                    </div>
                    <input type="password" {...formik.getFieldProps("password")} id="password" className="form-control" />
                </div>
                <SuperButton isLoading={formik.isSubmitting} onClick={onClickSignIn} className="btn btn-primary btn-block my-4" type="submit" disabled={!formik.isValid} >Sign In</SuperButton>
            </form>
        </div>
    )
})
