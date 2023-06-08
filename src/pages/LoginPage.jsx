import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify"

import * as Yup from "yup"

import SuperButton from "../components/SuperButton";
import { useAuth } from "../hooks/auth";
import { toastFormikErrors } from "../utils";
import BasePage from "./layouts/BasePage";



export default function LoginPage() {
    const { Authenticate } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const redirectTo = searchParams.get('to')

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address.").required("Email Required."),
            password: Yup.string().required("Password required.")
        }),
        onSubmit: (values) => {
            Authenticate(values.email, values.password).then(data => {
                if (!data.errors)
                {
                    toast.success(data.message)
                    if (redirectTo)
                        return navigate(redirectTo)
                }
                else
                    toast.error(data.message)

                formik.setSubmitting(false)
            })
        }
    });

    const onClickSignIn = useCallback(() => {
        toastFormikErrors(formik.errors)
    }, [])

    return (
        <BasePage>
            <section className="container">
                <div className="row my-5 py-5">
                    <div className="col-md-5 m-auto p-5">
                        <h1 className="text-center mb-5">Sign In</h1>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="text" {...formik.getFieldProps("email")} id="email" className="form-control form-control-lg" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input type="password" {...formik.getFieldProps("password")} id="password" className="form-control form-control-lg" />
                            </div>
                            <SuperButton isLoading={formik.isSubmitting} loadingText="Sign In..." onClick={onClickSignIn} className="btn btn-primary btn-lg btn-block my-4" type="submit" disabled={!formik.isValid} >Sign In</SuperButton>
                        </form>
                        <span>Don't have an account? <Link to="/register">Sign Up</Link></span>
                    </div>
                </div>
            </section>
        </BasePage>
    )
}
