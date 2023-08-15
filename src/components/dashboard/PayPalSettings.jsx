import { useQueryClient } from "react-query";
import { useModel } from "../../hooks/templates";
import PasswordInput from "../PasswordInput";
import Switch from "../Switch";
import PayPalIcon from "../icons/PayPalIcon";
import { useFormik } from "formik";
import { registerPayPalWebhook, saveDashboardSettings } from "../../api/admin";
import { toast } from "react-toastify";
import * as Yup from "yup"
import { memo, useEffect } from "react";
import { useDemo } from "../../hooks";


export default memo(function PayPalSettings({ settings })
{
    const { isDemo } = useDemo()
    const queryClient = useQueryClient()
    const { isOpen, open, close, Model } = useModel()


    const formik = useFormik({
        initialValues: {
            PM_PAYPAL_CLIENT_ID: settings?.PM_PAYPAL_CLIENT_ID,
            PM_PAYPAL_CLIENT_SECRET: settings?.PM_PAYPAL_CLIENT_SECRET,
            PM_PAYPAL_SANDBOX: settings?.PM_PAYPAL_SANDBOX,
            PM_PAYPAL_STATUS: settings?.PM_PAYPAL_STATUS,
        },
        validationSchema: Yup.object({
            PM_PAYPAL_CLIENT_ID: Yup.string(),
            PM_PAYPAL_CLIENT_SECRET: Yup.string(),
            PM_PAYPAL_SANDBOX: Yup.boolean(),
            PM_PAYPAL_STATUS: Yup.boolean(),
        }),
        onSubmit: (values) => {

            if (isDemo)
                return toast.success("This action isn't allowed on the demo mode!")

            if (values.PM_PAYPAL_STATUS && (!values.PM_PAYPAL_CLIENT_ID.length || !values.PM_PAYPAL_CLIENT_SECRET.length))
            {
                toast.warning("Please fill up PayPal Client ID and Secret fields first before activation!")
                formik.setSubmitting(false)
            }
            else
            {
                saveDashboardSettings(values).then((data) => {
                    if (data?.errors) {
                        toast.error(data?.message)
                    }
                    else {
                        queryClient.invalidateQueries("admin.settings")
                        queryClient.invalidateQueries("settings")
                        toast.success(data.message)
                    }

                    // update PayPal Webhook

                    if (
                        values.PM_PAYPAL_CLIENT_ID !== settings.PM_PAYPAL_CLIENT_ID
                        || values.PM_PAYPAL_CLIENT_SECRET !== settings.PM_PAYPAL_CLIENT_SECRET)
                    {
                        registerPayPalWebhook().then((req) => {
                            if (req.status === 201 && !req.data?.errors)
                            {
                                toast.success(req.data?.message)
                            }
                        }).catch(err => {
                            if (err.response.status === 400)
                            {
                                toast.error(err.response.data?.message)
                            }
                        }).finally(() => {
                            formik.setSubmitting(false)
                        })
                    }
                    else
                    {
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
                    <PayPalIcon />
                </h2>
                <span className="d-flex align-items-center">
                    {settings.PM_PAYPAL_STATUS ? (
                        <span className="badge text-bg-success">Active</span>
                    ) : (
                        <span className="badge text-bg-warning">Inactive</span>
                    )}
                </span>
                <button className="btn btn-primary" onClick={open}>Settings</button>
            </div>

            <Model title="PayPal Gateway Settings" footer={
                <button className="btn btn-primary w-25">Save</button>
            }>
                <div className="mb-4">
                    <label htmlFor="client-id">Client ID:</label>
                    <input type="text" className="form-control" id="client-id" {...formik.getFieldProps("PM_PAYPAL_CLIENT_ID")} />
                </div>
                <div className="mb-4">
                    <label htmlFor="client-secret">Client Secret:</label>

                    <PasswordInput id="client-secret" placeholder="" {...formik.getFieldProps("PM_PAYPAL_CLIENT_SECRET")} />
                </div>

                <div className="d-flex">
                    <Switch onChange={(checked) => formik.setFieldValue("PM_PAYPAL_STATUS", checked)} name="accept" checked={formik.values.PM_PAYPAL_STATUS} size="small" className="mx-2 mt-1" />

                    <label htmlFor="status" className="form-label" onClick={() => formik.setFieldValue("PM_PAYPAL_STATUS", !formik.values.PM_PAYPAL_STATUS)} >{formik.values.PM_PAYPAL_STATUS ? "Active" : "Inactive"}</label>
                </div>

                <div className="d-flex">
                    <Switch onChange={(checked) => formik.setFieldValue("PM_PAYPAL_SANDBOX", checked)} name="accept" checked={formik.values.PM_PAYPAL_SANDBOX} size="small" className="mx-2 mt-1" />

                    <label htmlFor="PM_PAYPAL_SANDBOX" className="form-label" onClick={() => formik.setFieldValue("PM_PAYPAL_SANDBOX", !formik.values.PM_PAYPAL_SANDBOX)} >Sandbox <i><small>(test mode)</small></i></label>
                </div>
            </Model>
        </div>
    )
})
