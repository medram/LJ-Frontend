
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as Yup from "yup"
import { toastFormikErrors } from "../../../utils";
import { addPlan } from "../../../api/admin";
import { toast } from "react-toastify";
import SuperButton from "../../SuperButton";
import { useQueryClient } from "react-query";
import Switch from "../../Switch"
import Select from "react-select";
import { useSettings } from "../../../hooks";


const BILLING_CYCLE_OPTIONS = [
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" }
]


export default function AddPlanForm({ close }) {
    const queryClient = useQueryClient()
    const { settings } = useSettings()


    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: 0,
            is_popular: false,
            is_free: false,
            billing_cycle: "monthly",
            status: false,
            pdfs: 0,
            pdf_size: 0,
            questions: 0,
            features: "",
            paypal_plan_id: "",
            stripe_plan_id: "",
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
        onSubmit: (values) => {

            addPlan(values).then((data) => {
                if (data.errors === false) {
                    formik.resetForm()
                    toast.success(data.message)
                    queryClient.invalidateQueries('admin.plans')
                    close()
                }
                else
                {
                    return toast.error(data.message)
                }
            }).catch(error => {
                toast.error(error.response.data.message)
            }).finally(() => {
                formik.setSubmitting(false)
            })
        }
    })


    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="mb-4">
                <label htmlFor="name">Name:</label>
                <input type="text" className="form-control" placeholder="e.g. Premium" id="name" {...formik.getFieldProps("name")} autoFocus />
            </div>

            <div className="mb-4">
                <label htmlFor="description">Description (optional):</label>
                <input type="text" className="form-control" id="slug" placeholder="e.g. The Best for Startups" {...formik.getFieldProps("description")} />
            </div>

            <label htmlFor="price">Price (in {settings?.CURRENCY}):</label>
            <div className="input-group mb-4">
                <span className="input-group-text">{settings?.CURRENCY_SYMBOL}</span>
                <input type="number" className="form-control" disabled={formik.values.is_free} placeholder="e.g. 5.99" id="price" {...formik.getFieldProps("price")} min={0} step={0.01} />
            </div>

            <div className="mb-4">
                <label htmlFor="billing_cycle">Billing Cycle:</label>
                <Select options={BILLING_CYCLE_OPTIONS} isSearchable={false} defaultValue={BILLING_CYCLE_OPTIONS[0]} id="billing_cycle" onChange={(option) => formik.setFieldValue("billing_cycle", option.value || BILLING_CYCLE_OPTIONS[0].value)} />
            </div>

            <div className="d-flex mb-3">
                <Switch onChange={(checked) => {
                    formik.setFieldValue("is_free", checked)
                    formik.setFieldValue("price", 0)
                    }} name="accept" checked={formik.values.is_free} size="small" className="mx-2 mt-1" />

                <label htmlFor="is_free" className="form-label" onClick={() => {
                    formik.setFieldValue("is_free", !formik.values.is_free)
                    formik.setFieldValue("price", 0)
                    }} >Free plan!</label>
            </div>

            <div className="d-flex mb-3">
                <Switch onChange={(checked) => formik.setFieldValue("is_popular", checked)} name="accept" checked={formik.values.is_popular} size="small" className="mx-2 mt-1" />

                <label htmlFor="is_popular" className="form-label" onClick={() => formik.setFieldValue("is_popular", !formik.values.is_popular)} >set as popular (show popular mark)!</label>
            </div>

            <div className="d-flex mb-3">
                <Switch onChange={(checked) => formik.setFieldValue("status", checked)} name="status" checked={formik.values.status} size="small" className="mx-2 mt-1" />

                <label htmlFor="status" className="form-label" onClick={() => formik.setFieldValue("status", !formik.values.status)} >Status</label>
            </div>

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

            <SuperButton isLoading={formik.isSubmitting} type="submit" className="btn btn-primary btn-lg btn-block" onClick={() => toastFormikErrors(formik.errors)}><FontAwesomeIcon icon={faPlus} /> Add</SuperButton>
        </form>
    )
}

