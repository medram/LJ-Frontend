import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { useFormik } from "formik";
import { memo } from "react";
import * as Yup from "yup"

import { saveDashboardSettings } from "../../api/admin";
import { useModel } from "../../hooks/templates";
import PasswordInput from "../PasswordInput";
import Switch from "../Switch";
import { useDemo } from "../../hooks";
import StripIcon from "../icons/StripIcon";
import GatewayNotes from "./GatewayNotes";


export default memo(function StripeSettings({ settings }) {
    const { isDemo } = useDemo()
    const queryClient = useQueryClient()
    const { isOpen, open, close, Model } = useModel()


    const formik = useFormik({
        initialValues: {
            PM_STRIP_PUBLIC_KEY: settings?.PM_STRIP_PUBLIC_KEY,
            PM_STRIP_PRIVATE_KEY: settings?.PM_STRIP_PRIVATE_KEY,
            PM_STRIP_SANDBOX: settings?.PM_STRIP_SANDBOX,
            PM_STRIP_STATUS: settings?.PM_STRIP_STATUS,
        },
        validationSchema: Yup.object({
            PM_STRIP_PUBLIC_KEY: Yup.string(),
            PM_STRIP_PRIVATE_KEY: Yup.string(),
            PM_STRIP_SANDBOX: Yup.boolean(),
            PM_STRIP_STATUS: Yup.boolean(),
        }),
        onSubmit: (values) => {

            if (isDemo)
                return toast.success("This action isn't allowed on the demo mode!")

            if (values.PM_STRIP_STATUS && (!values.PM_STRIP_PUBLIC_KEY.length || !values.PM_STRIP_PRIVATE_KEY.length)) {
                toast.warning("Please fill up Stripe Client ID and Secret fields first before activation!")
                formik.setSubmitting(false)
            }
            else {
                saveDashboardSettings(values).then((data) => {
                    if (data?.errors) {
                        toast.error(data?.message)
                    }
                    else {
                        queryClient.invalidateQueries("admin.settings")
                        queryClient.invalidateQueries("settings")
                        toast.success(data.message)
                    }

                    // update Stripe Webhook

                    if (
                        values.PM_STRIP_PUBLIC_KEY !== settings.PM_STRIP_PUBLIC_KEY
                        || values.PM_STRIP_PRIVATE_KEY !== settings.PM_STRIP_PRIVATE_KEY) {
                        // registerStripeWebhook().then((req) => {
                        //     if (req.status === 201 && !req.data?.errors) {
                        //         toast.success(req.data?.message)
                        //     }
                        // }).catch(err => {
                        //     if (err.response.status === 400) {
                        //         toast.error(err.response.data?.message)
                        //     }
                        // }).finally(() => {
                        //     formik.setSubmitting(false)
                        // })
                    }
                    else {
                        formik.setSubmitting(false)
                    }
                }).catch(err => {
                    toast.error(err)
                }).finally(() => {
                    // formik.setSubmitting(false)
                })
            }
        }
    })

    return (
        <div className="bg-light rounded p-4 mb-3">
            <div className="d-flex justify-content-stretch justify-content-md-between flex-column flex-md-row gap-3 align-items-center">
                <h2 className="h3 mb-0">
                    <StripIcon />
                </h2>
                <span className="d-flex align-items-center">
                    {settings.PM_STRIP_STATUS ? (
                        <span className="badge text-bg-success">Active</span>
                    ) : (
                        <span className="badge text-bg-warning">Inactive</span>
                    )}
                </span>
                <button className="btn btn-primary" onClick={open}>Settings</button>
            </div>

            <Model title="Stripe Gateway Settings" footer={
                <button className="btn btn-primary w-25">Save</button>
            }>
                <div className="mb-4">
                    <label htmlFor="client-id">Public Key:</label>
                    <input type="text" className="form-control" id="client-id" {...formik.getFieldProps("PM_STRIP_PUBLIC_KEY")} />
                </div>
                <div className="mb-4">
                    <label htmlFor="private-key">Private Key:</label>

                    <PasswordInput id="private-key" placeholder="" {...formik.getFieldProps("PM_STRIP_PRIVATE_KEY")} />
                </div>

                <div className="d-flex">
                    <Switch onChange={(checked) => formik.setFieldValue("PM_STRIP_STATUS", checked)} name="accept" checked={formik.values.PM_STRIP_STATUS} size="small" className="mx-2 mt-1" />

                    <label htmlFor="status" className="form-label" onClick={() => formik.setFieldValue("PM_STRIP_STATUS", !formik.values.PM_STRIP_STATUS)} >{formik.values.PM_STRIP_STATUS ? "Active" : "Inactive"}</label>
                </div>

                <div className="d-flex">
                    <Switch onChange={(checked) => formik.setFieldValue("PM_STRIP_SANDBOX", checked)} name="accept" checked={formik.values.PM_STRIP_SANDBOX} size="small" className="mx-2 mt-1" />

                    <label htmlFor="PM_STRIP_SANDBOX" className="form-label" onClick={() => formik.setFieldValue("PM_STRIP_SANDBOX", !formik.values.PM_STRIP_SANDBOX)} >Sandbox <i><small>(test mode)</small></i></label>
                </div>

                <GatewayNotes />
            </Model>
        </div>
    )
})
