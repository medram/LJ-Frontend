import { useDashboardSettings, useDemo } from "../../hooks"
import SectionLoading from "../../components/SectionLoading"
import PayPalSettings from "../../components/dashboard/PayPalSettings"
import StripeSettings from "../../components/dashboard/StripeSettings"


export default function PaymentMethodsPage()
{
    const { isDemo } = useDemo()
    const { isLoading, settings } = useDashboardSettings()
    // const queryClient = useQueryClient()

    // const formik = useFormik({
    //     initialValues: {
    //         PM_PAYPAL_CLIENT_ID: "",
    //         PM_PAYPAL_CLIENT_SECRET: "",
    //         PM_PAYPAL_SANDBOX: false,
    //         PM_PAYPAL_STATUS: false,

    //         PM_STRIP_PUBLIC_KEY: "",
    //         PM_STRIP_PRIVATE_KEY: "",
    //         PM_STRIP_SANDBOX: false,
    //         PM_STRIP_STATUS: false,
    //     },
    //     validationSchema: Yup.object({
    //         PM_PAYPAL_CLIENT_ID: Yup.string(),
    //         PM_PAYPAL_CLIENT_SECRET: Yup.string(),
    //         PM_PAYPAL_SANDBOX: Yup.boolean(),
    //         PM_PAYPAL_STATUS: Yup.boolean(),

    //         PM_STRIP_PUBLIC_KEY: Yup.string(),
    //         PM_STRIP_PRIVATE_KEY: Yup.string(),
    //         PM_STRIP_SANDBOX: Yup.boolean(),
    //         PM_STRIP_STATUS: Yup.boolean(),
    //     }),
    //     onSubmit: (values) => {

    //         if (isDemo)
    //             return toast.success("This action isn't allowed on the demo mode!")

    //         if (values.PM_PAYPAL_STATUS && (!values.PM_PAYPAL_CLIENT_ID.length || !values.PM_PAYPAL_CLIENT_SECRET.length))
    //         {
    //             toast.warning("Please fill up PayPal Client ID and Secret fields first before activation!")
    //             formik.setSubmitting(false)
    //         }
    //         else if (values.PM_STRIP_STATUS && (!values.PM_STRIP_PUBLIC_KEY.length || !values.PM_STRIP_PRIVATE_KEY.length))
    //         {
    //             toast.warning("Please fill up Strip public and private keys fields first before activation!")
    //             formik.setSubmitting(false)
    //         }
    //         else
    //         {
    //             saveDashboardSettings(values).then((data) => {
    //                 if (data?.errors) {
    //                     toast.error(data?.message)
    //                 }
    //                 else {
    //                     queryClient.invalidateQueries("admin.settings")
    //                     queryClient.invalidateQueries("settings")
    //                     toast.success(data.message)
    //                 }

    //                 // update PayPal Webhook

    //                 if (
    //                     values.PM_PAYPAL_CLIENT_ID !== settings.PM_PAYPAL_CLIENT_ID
    //                     || values.PM_PAYPAL_CLIENT_SECRET !== settings.PM_PAYPAL_CLIENT_SECRET)
    //                 {
    //                     registerPayPalWebhook().then((req) => {
    //                         if (req.status === 201 && !req.data?.errors)
    //                         {
    //                             toast.success(req.data?.message)
    //                         }
    //                     }).catch(err => {
    //                         if (err.response.status === 400)
    //                         {
    //                             toast.error(err.response.data?.message)
    //                         }
    //                     }).finally(() => {
    //                         formik.setSubmitting(false)
    //                     })
    //                 }
    //                 else
    //                 {
    //                     formik.setSubmitting(false)
    //                 }
    //             }).catch(err => {
    //                 toast.error(err)
    //             }).finally(() => {
    //                 // formik.setSubmitting(false)
    //             })
    //         }
    //     }
    // })

    // useEffect(() => {
    //     if (Object.keys(settings).length)
    //     {
    //         formik.setValues({
    //             PM_PAYPAL_CLIENT_ID: settings?.PM_PAYPAL_CLIENT_ID,
    //             PM_PAYPAL_CLIENT_SECRET: settings?.PM_PAYPAL_CLIENT_SECRET,
    //             PM_PAYPAL_SANDBOX: settings?.PM_PAYPAL_SANDBOX,
    //             PM_PAYPAL_STATUS: settings?.PM_PAYPAL_STATUS,

    //             PM_STRIP_PUBLIC_KEY: settings?.PM_STRIP_PUBLIC_KEY,
    //             PM_STRIP_PRIVATE_KEY: settings?.PM_STRIP_PRIVATE_KEY,
    //             PM_STRIP_SANDBOX: settings?.PM_STRIP_SANDBOX,
    //             PM_STRIP_STATUS: settings?.PM_STRIP_STATUS,
    //         })
    //     }
    // }, [settings])


    if (isLoading || !Object.keys(settings).length)
    {
        return <SectionLoading center={true} />
    }

    return (
        <>
            <h1 className="mb-5">Payment Gateways</h1>

            <div className="row">
                {/* <div className="col-md-6">
                    <section className="bg-light rounded p-4 mb-3">
                        <div className="d-flex justify-content-between">
                            <h2 className="h3 mb-4">
                                <PayPalIcon />
                            </h2>
                            <span className="d-flex mt-2">
                                <Switch onChange={(checked) => formik.setFieldValue("PM_PAYPAL_STATUS", checked)} name="accept" checked={formik.values.PM_PAYPAL_STATUS} size="small" className="mx-2 mt-1" />

                                <label htmlFor="status" className="form-label" onClick={() => formik.setFieldValue("PM_PAYPAL_STATUS", !formik.values.PM_PAYPAL_STATUS)} >{formik.values.PM_PAYPAL_STATUS ? "Active" : "Inactive"}</label>
                            </span>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="client-id">Client ID:</label>
                            <input type="text" className="form-control" id="client-id" {...formik.getFieldProps("PM_PAYPAL_CLIENT_ID")} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="client-secret">Client Secret:</label>

                            <PasswordInput id="client-secret" placeholder="" {...formik.getFieldProps("PM_PAYPAL_CLIENT_SECRET")} />
                        </div>
                        <div className="d-flex">
                            <Switch onChange={(checked) => formik.setFieldValue("PM_PAYPAL_SANDBOX", checked)} name="accept" checked={formik.values.PM_PAYPAL_SANDBOX} size="small" className="mx-2 mt-1" />

                            <label htmlFor="PM_PAYPAL_SANDBOX" className="form-label" onClick={() => formik.setFieldValue("PM_PAYPAL_SANDBOX", !formik.values.PM_PAYPAL_SANDBOX)} >Sandbox <i><small>(test mode)</small></i></label>
                        </div>
                    </section>
                </div> */}

                <div className="col-12 col-md-6">
                    <PayPalSettings settings={settings} />
                    <StripeSettings settings={settings} />
                </div>
            </div>

        </>
    )
}
