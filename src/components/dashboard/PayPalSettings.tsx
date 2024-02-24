import { SecretSettingsType } from "@/utils/types";
import { syncWithPayPal } from "@api/admin";
import PasswordInput from "@components/PasswordInput";
import SuperButton from "@components/SuperButton";
import Switch from "@components/Switch";
import PayPalIcon from "@components/icons/PayPalIcon";
import { useDemo } from "@hooks/index";
import { useModel } from "@hooks/templates";
import { useFormik } from "formik";
import { memo } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";
import GatewayNotes from "./GatewayNotes";


type PayPalSettingsProps = {
    settings: SecretSettingsType
}

export default memo(function PayPalSettings({ settings }: PayPalSettingsProps)
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

            syncWithPayPal(values).then((req) => {
                if (req.status === 201 && !req.data?.errors) {
                    toast.success(req.data?.message)
                    // clear cache
                    queryClient.invalidateQueries("admin.settings")
                    queryClient.invalidateQueries("settings")
                }
            }).catch(err => {
                if (err.response.data?.message) {
                    toast.error(err.response.data?.message)
                }
                else
                {
                    toast.error(err.message)
                }
            }).finally(() => {
                formik.setSubmitting(false)
            })

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
                <button className="btn btn-primary" onClick={() => open()}>Settings</button>
            </div>

            <Model title="PayPal Gateway Settings" footer={
                <SuperButton className="btn btn-primary w-100" onClick={() => formik.submitForm()} isLoading={formik.isSubmitting}>
                    Save & Sync
                </SuperButton>
            }>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="client-id">Client ID:</label>
                        <input type="text" className="form-control" id="client-id" {...formik.getFieldProps("PM_PAYPAL_CLIENT_ID")} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="client-secret">Client Secret:</label>

                        <PasswordInput id="client-secret" placeholder="" {...formik.getFieldProps("PM_PAYPAL_CLIENT_SECRET")} />
                    </div>

                    <div className="d-flex">
                        <Switch onChange={(checked: boolean) => formik.setFieldValue("PM_PAYPAL_STATUS", checked)} name="accept" checked={formik.values.PM_PAYPAL_STATUS} size="small" className="mx-2 mt-1" />

                        <label htmlFor="status" className="form-label" onClick={() => formik.setFieldValue("PM_PAYPAL_STATUS", !formik.values.PM_PAYPAL_STATUS)} >{formik.values.PM_PAYPAL_STATUS ? "Active" : "Inactive"}</label>
                    </div>

                    <div className="d-flex">
                        <Switch onChange={(checked: boolean) => formik.setFieldValue("PM_PAYPAL_SANDBOX", checked)} name="accept" checked={formik.values.PM_PAYPAL_SANDBOX} size="small" className="mx-2 mt-1" />

                        <label htmlFor="PM_PAYPAL_SANDBOX" className="form-label" onClick={() => formik.setFieldValue("PM_PAYPAL_SANDBOX", !formik.values.PM_PAYPAL_SANDBOX)} >Sandbox <i><small>(test mode)</small></i></label>
                    </div>
                </form>

                <GatewayNotes />
            </Model>
        </div>
    )
})
