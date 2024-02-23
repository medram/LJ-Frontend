import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import Select from "react-select";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { editPlan } from "../../../api/admin";
import { useDashboardPlan, useSettings } from "../../../hooks";
import { toastFormikErrors } from "../../../utils";
import SectionLoading from "../../SectionLoading";
import SuperButton from "../../SuperButton";
import Switch from "../../Switch";


const BILLING_CYCLE_OPTIONS = [
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" }
]


export default function EditPlanForm({ close, planId }) {
    const queryClient = useQueryClient()
    const { settings } = useSettings()
    const { isLoading, isError, error, plan } = useDashboardPlan(planId)

    // fixing null values
    plan.description = plan?.description == null ? "" : plan?.description
    plan.features = plan?.features == null ? "" : plan?.features


    const formik = useFormik({
        initialValues: {
            "name": plan.name,
            "description": plan.description,
            "price": plan.price,
            "billing_cycle": plan.billing_cycle,
            "is_popular": plan.is_popular,
            "is_free": plan.is_free,
            "status": plan.status,
            "pdfs": plan.pdfs,
            "pdf_size": plan.pdf_size,
            "questions": plan.questions,
            "features": plan.features,
            "paypal_plan_id": plan.paypal_plan_id,
            "stripe_plan_id": plan.stripe_plan_id,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            description: Yup.string().nullable(),
            price: Yup.number("Price must be a number."),
            billing_cycle: Yup.string().oneOf(["monthly", "yearly"], "Invalid Billing Cycle!"),
            is_popular: Yup.boolean("Popular field must be boolean"),
            is_free: Yup.boolean("Free Plan field must be boolean"),
            status: Yup.boolean("Status field must be boolean"),
            pdfs: Yup.number("Documents field must be a number."),
            pdf_size: Yup.number("Pdf Size field must be a number."),
            questions: Yup.number("Questions field must be a number."),
            features: Yup.string().nullable(),
            paypal_plan_id: Yup.string().nullable(),
            stripe_plan_id: Yup.string().nullable()
        }),
        enableReinitialize: true,
        onSubmit: (values) => {

            if (!values.is_free && values.price == 0)
                return toast.warning("The plan price can't be 0!")

            editPlan(plan.id, values).then((data) => {
                if (data.errors === false) {
                    formik.resetForm()
                    toast.success(data.message)
                    queryClient.invalidateQueries('admin.plans')
                    close()
                }
                else {
                    return toast.error(data.message)
                }
            }).catch(error => {
                toast.error(error.response.data.message)
            }).finally(() => {
                formik.setSubmitting(false)
            })
        }
    })


    if (isLoading && !Object.keys(plan).length)
    {
        return <SectionLoading center={true} />
    }

    const defaultBillingCycle = formik.values.billing_cycle === "monthly" ? BILLING_CYCLE_OPTIONS[0] : BILLING_CYCLE_OPTIONS[1]


    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="mb-4">
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control" placeholder="e.g. Premium" id="name" {...formik.getFieldProps("name")} autoFocus />
            </div>

            <div className="mb-4">
                <label htmlFor="description">Heading (optional):</label>
                <input type="text" className="form-control" id="slug" placeholder="e.g. The Best for Startups" {...formik.getFieldProps("description")} />
            </div>

            <label htmlFor="price">Price (in {settings?.CURRENCY}):</label>
            <div className="input-group mb-4">
                <span className="input-group-text">{settings?.CURRENCY_SYMBOL}</span>
                <input type="number" className="form-control" placeholder="e.g. 5.99" id="price" {...formik.getFieldProps("price")} min={0} step={0.01} disabled={formik.values.is_free} />
            </div>

            <div className="mb-4">
                <label htmlFor="billing_cycle">Billing Cycle:</label>
                <Select options={BILLING_CYCLE_OPTIONS} isSearchable={false} defaultValue={defaultBillingCycle} id="billing_cycle" isDisabled />
            </div>

            <div className="d-flex mb-3">
                <Switch name="is_free" checked={!!formik.values.is_free} size="small" className="mx-2 mt-1" disabled />

                <label htmlFor="is_free" className="form-label" >Free plan!</label>
            </div>

            <div className="d-flex mb-3">
                <Switch onChange={(checked) => formik.setFieldValue("is_popular", checked)} name="is-popular" checked={!!formik.values.is_popular} size="small" className="mx-2 mt-1" />

                <label htmlFor="is_popular" className="form-label" onClick={() => formik.setFieldValue("is_popular", !formik.values.is_popular)} >set as popular (show popular mark)!</label>
            </div>

            <div className="d-flex mb-3">
                <Switch onChange={(checked) => formik.setFieldValue("status", checked)} name="status" checked={!!formik.values.status} size="small" className="mx-2 mt-1" />

                <label htmlFor="status" className="form-label" onClick={() => formik.setFieldValue("status", !formik.values.status)} >Status</label>
            </div>

            {!formik.values.is_free && <hr />}

            {!!formik.values.paypal_plan_id && !formik.values.is_free && (
                <div className="mb-4">
                    <label htmlFor="paypal-plan-id">PayPal Subscription Plan ID:</label>
                    <input type="text" className="form-control" placeholder="e.g. P-6C235282FB245950NMRTE5II" id="paypal-plan-id" value={formik.values.paypal_plan_id} disabled />
                </div>
            )}

            {!!formik.values.stripe_plan_id && !formik.values.is_free && (
                <div className="mb-4">
                    <label htmlFor="stripe-plan-id">Stripe Subscription Plan ID:</label>
                    <input type="text" className="form-control" placeholder="e.g. price_1OgY8eCu5wfmOdwtc3h" id="stripe-plan-id" value={formik.values.stripe_plan_id} disabled />
                </div>
            )}

            <hr />
            <div className="mb-4">
                <label htmlFor="pdfs">Max Documents <small>(0 = unlimited)</small>:</label>
                <input type="number" className="form-control" placeholder="e.g. 10" id="pdfs" {...formik.getFieldProps("pdfs")} min={0} onChange={(e) => formik.setFieldValue('pdfs', parseInt(e.target.value))} />
            </div>

            <div className="mb-4">
                <label htmlFor="pdf_size">Max Document Size (in MB) <small>(0 = unlimited)</small>:</label>
                <input type="number" className="form-control" placeholder="e.g. 10" id="pdf_size" {...formik.getFieldProps("pdf_size")} min={0} step={0.1} />
            </div>

            <div className="mb-4">
                <label htmlFor="questions">Max Questions <small>(0 = unlimited)</small>:</label>
                <input type="number" className="form-control" placeholder="e.g. 10" id="questions" {...formik.getFieldProps("questions")} min={0} onChange={(e) => formik.setFieldValue('questions', parseInt(e.target.value))} />
            </div>

            <hr />

            <div className="mb-4">
                <label htmlFor="features">More Plan Features <small><i>(feature per line)</i></small>:</label>
                <textarea className="form-control" placeholder="e.g. 24/7 Support." id="features" {...formik.getFieldProps("features")} rows={3} onChange={(e) => formik.setFieldValue('features', e.target.value)} ></textarea>
            </div>

            <SuperButton isLoading={formik.isSubmitting} type="submit" className="btn btn-primary btn-lg btn-block" onClick={() => toastFormikErrors(formik.errors)}>Update</SuperButton>
        </form>
    )
}

