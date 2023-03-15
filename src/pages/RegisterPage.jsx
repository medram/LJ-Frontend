import { Formik, useFormik } from "formik";
import { Link } from "react-router-dom";
import SuperButton from "../components/SuperBotton";
import Switch from "../components/Switch";
import * as Yup from "yup"
import BasePage from "./layouts/BasePage";
import { useEffect } from "react";
import { toastFormikErrors } from "../utils";


export default function RegisterPage() {
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            accept: false
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username required.").min(4, "Username must be 4 characters or more."),
            email: Yup.string().required("Email required."),
            password: Yup.string().required("Password required.").min(6, "Password must be 6 characters or more."),
            accept: Yup.boolean().required().oneOf([true], "You must accept the terms and conditions.")
        }),
        onSubmit: (values) => {
            console.log("submited", values)
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
                                <input type="text" id="username" className="form-control form-control-lg" {...formik.getFieldProps("username")} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" id="email" className="form-control form-control-lg" {...formik.getFieldProps("email")} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input type="password" id="password" className="form-control form-control-lg" {...formik.getFieldProps("password")} />
                            </div>
                            <div className="d-flex mb-3">
                                <Switch onChange={(checked) => formik.setFieldValue("accept", checked)} name="accept" checked={formik.values.accept} size="small" className="mx-2 mt-1" />

                                <label htmlFor="accept" className="form-label" onClick={() => formik.setFieldValue("accept", !formik.values.accept)} >I read and accept terms of use & privacy policy of the website.</label>
                            </div>

                            <SuperButton type="submit" disabled={!formik.values.accept} onClick={() => toastFormikErrors(formik.errors)} className="btn btn-primary btn-lg btn-block my-4">Sign In</SuperButton>
                        </form>
                        <span>Already Have an account? <Link to="/login">Sign In</Link></span>
                    </div>
                </div>
            </section>
        </BasePage>
    )
}
