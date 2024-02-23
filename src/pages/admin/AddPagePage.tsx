import { addPage } from "@api/admin";
import GoBackButton from "@components/GoBackButton";
import SuperButton from "@components/SuperButton";
import Switch from "@components/Switch";
import TextEditor from "@components/TextEditor";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toastFormikErrors } from "@utils/index";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";


export default function AddPagePage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()


    const formik = useFormik({
        initialValues: {
            title: "",
            slug: "",
            content: "",
            status: false
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required."),
            slug: Yup.string().required("slug is required."),
            content: Yup.string(),
            status: Yup.boolean()
        }),
        onSubmit: (values) => {
            addPage(values).then((data) => {
                if (data.errors === false) {
                    formik.resetForm()
                    toast.success(data.message)
                    queryClient.invalidateQueries('admin.pages')
                    return navigate(-1)
                }
                return toast.error(data.message)
            }).catch(error => {
                toast.error(error.response.data.message)
            }).finally(() => {
                formik.setSubmitting(false)
            })
        }
    })


    return (
        <>
            <h1 className="mb-3">Add Page</h1>
            <div className="row">
                <div className="col-md-8">
                    <GoBackButton />
                    <section className="bg-light rounded text-bg-light p-4">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title">Title:</label>
                                <input type="text" className="form-control" placeholder="e.g. Privacy Policy" id="title" {...formik.getFieldProps("title")} />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="slug">Slug:</label>
                                <input type="text" className="form-control" id="slug" placeholder="e.g. privacy-policy" {...formik.getFieldProps("slug")} />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="content">Content:</label>
                                <TextEditor onEditorChange={(content: string) => formik.setFieldValue("content", content)} />
                            </div>

                            <div className="d-flex mb-3">
                                <Switch onChange={(checked: boolean) => formik.setFieldValue("status", checked)} name="accept" checked={formik.values.status} size="small" className="mx-2 mt-1" />

                                <label htmlFor="status" className="form-label" onClick={() => formik.setFieldValue("status", !formik.values.status)} >Published</label>
                            </div>

                            <SuperButton isLoading={formik.isSubmitting} type="submit" className="btn btn-primary" onClick={() => toastFormikErrors(formik.errors)}><FontAwesomeIcon icon={faPlus} /> Add</SuperButton>
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}
