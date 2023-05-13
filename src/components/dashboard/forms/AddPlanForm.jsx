
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as Yup from "yup"
import { toastFormikErrors } from "../../../utils";
import { addPlan } from "../../../api/admin";
import { toast } from "react-toastify";
import SuperButton from "../../SuperBotton";
import { useQueryClient } from "react-query";
import Switch from "../../Switch"
import Select from "react-select";
import { useSettings } from "../../../hooks";
import SectionLoading from "../../SectionLoading";


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
            pdf_pages: 0,
            questions: 0
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            description: Yup.string(),
            price: Yup.number("Price must be a number."),
            is_popular: Yup.boolean("Popular field must be boolean"),
            is_free: Yup.boolean("Free field must be boolean"),
            billing_cycle: Yup.string(),
            status: Yup.boolean("Status field must be boolean"),
            pdfs: Yup.number("Pdfs field must be a number."),
            pdf_size: Yup.number("Pdf Size field must be a number."),
            pdf_pages: Yup.number("Pdf Pages field must be a number."),
            questions: Yup.number("Questions field must be a number.")
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
                <input type="number" className="form-control" disabled={formik.values.is_free} placeholder="e.g. 5.99" id="price" {...formik.getFieldProps("price")} min={0} />
            </div>

            <div className="mb-4">
                <label htmlFor="billing_cycle">Billing Cycle:</label>
                <Select options={BILLING_CYCLE_OPTIONS} isSearchable={false} defaultValue={BILLING_CYCLE_OPTIONS[0]} id="billing_cycle" onChange={(option) => formik.setFieldValue("billing_cycle", option.value || BILLING_CYCLE_OPTIONS[0].value)} />
            </div>

            <div className="d-flex mb-3">
                <Switch onChange={(checked) => formik.setFieldValue("is_free", checked)} name="accept" checked={formik.values.is_free} size="small" className="mx-2 mt-1" />

                <label htmlFor="is_free" className="form-label" onClick={() => formik.setFieldValue("is_free", !formik.values.is_free)} >Free plan!</label>
            </div>

            <div className="d-flex mb-3">
                <Switch onChange={(checked) => formik.setFieldValue("is_popular", checked)} name="accept" checked={formik.values.is_popular} size="small" className="mx-2 mt-1" />

                <label htmlFor="is_popular" className="form-label" onClick={() => formik.setFieldValue("is_popular", !formik.values.is_popular)} >set as popular (show popular mark)!</label>
            </div>

            <div className="d-flex mb-3">
                <Switch onChange={(checked) => formik.setFieldValue("status", checked)} name="accept" checked={formik.values.status} size="small" className="mx-2 mt-1" />

                <label htmlFor="status" className="form-label" onClick={() => formik.setFieldValue("status", !formik.values.status)} >Status</label>
            </div>
            <hr />
            <div className="mb-4">
                <label htmlFor="pdfs">Max PDFs <small>(0 = unlimited)</small>:</label>
                <input type="number" className="form-control" placeholder="e.g. 10" id="pdfs" {...formik.getFieldProps("pdfs")} min={0} onChange={(e) => formik.setFieldValue('pdfs', parseInt(e.target.value))} />
            </div>

            <div className="mb-4">
                <label htmlFor="pdf_pages">Max PDF pages <small>(0 = unlimited)</small>:</label>
                <input type="number" className="form-control" placeholder="e.g. 50" id="pdf_pages" {...formik.getFieldProps("pdf_pages")} min={0} onChange={(e) => formik.setFieldValue('pdf_pages', parseInt(e.target.value))} />
            </div>

            <div className="mb-4">
                <label htmlFor="pdf_size">Max PDF size (in MB) <small>(0 = unlimited)</small>:</label>
                <input type="number" className="form-control" placeholder="e.g. 10" id="pdf_size" {...formik.getFieldProps("pdf_size")} min={0} />
            </div>

            <div className="mb-4">
                <label htmlFor="questions">Max questions <small>(0 = unlimited)</small>:</label>
                <input type="number" className="form-control" placeholder="e.g. 10" id="questions" {...formik.getFieldProps("questions")} min={0} onChange={(e) => formik.setFieldValue('questions', parseInt(e.target.value))} />
            </div>

            <SuperButton isLoading={formik.isSubmitting} type="submit" className="btn btn-primary btn-lg btn-block" onClick={() => toastFormikErrors(formik.errors)}><FontAwesomeIcon icon={faPlus} /> Add</SuperButton>
        </form>
    )
}

