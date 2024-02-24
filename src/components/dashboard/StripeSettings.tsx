import { useFormik } from "formik";
import { memo } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { SecretSettingsType } from "@/utils/types";
import { syncWithStripe } from "@api/admin";
import PasswordInput from "@components/PasswordInput";
import SuperButton from "@components/SuperButton";
import Switch from "@components/Switch";
import StripIcon from "@components/icons/StripIcon";
import { useDemo } from "@hooks/index";
import { useModel } from "@hooks/templates";
import GatewayNotes from "./GatewayNotes";


type StripeSettingsProps = {
    settings: SecretSettingsType
}

export default memo(function StripeSettings({ settings }: StripeSettingsProps) {
    const { isDemo } = useDemo()
    const queryClient = useQueryClient()
    const { isOpen, open, close, Model } = useModel()


    const formik = useFormik({
        initialValues: {
            PM_STRIP_SECRET_KEY: settings?.PM_STRIP_SECRET_KEY,
            PM_STRIP_SECRET_KEY_TEST: settings?.PM_STRIP_SECRET_KEY_TEST,
            PM_STRIP_SANDBOX: settings?.PM_STRIP_SANDBOX,
            PM_STRIP_STATUS: settings?.PM_STRIP_STATUS,
        },
        validationSchema: Yup.object({
            PM_STRIP_SECRET_KEY: Yup.string(),
            PM_STRIP_SECRET_KEY_TEST: Yup.string(),
            PM_STRIP_SANDBOX: Yup.boolean(),
            PM_STRIP_STATUS: Yup.boolean(),
        }),
        onSubmit: (values) => {

            if (isDemo)
                return toast.success("This action isn't allowed on the demo mode!")

            syncWithStripe(values).then((req) => {
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
                <SuperButton className="btn btn-primary w-100" onClick={() => formik.submitForm()} isLoading={formik.isSubmitting}>
                    Save & Sync
                </SuperButton>
            }>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="secret-key">Secret Key (live):</label>

                        <PasswordInput id="secret-key" placeholder="sk_live_xxxxxxxxxx" {...formik.getFieldProps("PM_STRIP_SECRET_KEY")} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="secret-key-test">Secret Key (test):</label>
                        <PasswordInput id="secret-key-test" placeholder="sk_test_xxxxxxxxxx" {...formik.getFieldProps("PM_STRIP_SECRET_KEY_TEST")} />
                    </div>

                    <div className="d-flex">
                        <Switch onChange={(checked) => formik.setFieldValue("PM_STRIP_STATUS", checked)} name="accept" checked={formik.values.PM_STRIP_STATUS} size="small" className="mx-2 mt-1" />

                        <label htmlFor="status" className="form-label" onClick={() => formik.setFieldValue("PM_STRIP_STATUS", !formik.values.PM_STRIP_STATUS)} >{formik.values.PM_STRIP_STATUS ? "Active" : "Inactive"}</label>
                    </div>

                    <div className="d-flex">
                        <Switch onChange={(checked) => formik.setFieldValue("PM_STRIP_SANDBOX", checked)} name="accept" checked={formik.values.PM_STRIP_SANDBOX} size="small" className="mx-2 mt-1" />

                        <label htmlFor="PM_STRIP_SANDBOX" className="form-label" onClick={() => formik.setFieldValue("PM_STRIP_SANDBOX", !formik.values.PM_STRIP_SANDBOX)} >Sandbox <i><small>(test mode)</small></i></label>
                    </div>
                </form>

                <GatewayNotes />
            </Model>
        </div>
    )
})
