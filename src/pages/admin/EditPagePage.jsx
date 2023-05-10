import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as Yup from "yup"
import { toastFormikErrors } from "../../utils";
import { editPage } from "../../api/admin";
import { toast } from "react-toastify";
import GoBackButton from "../../components/GoBackButton";
import SuperButton from "../../components/SuperBotton";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import Switch from "../../components/Switch"
import { usePage } from "../../hooks/admin";
import { useEffect } from "react";
import SectionLoading from "../../components/SectionLoading";


export default function EditPagePage({ onGoBack }) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { id } = useParams()

    const { isLoading, isError, error, page } = usePage(id)

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
        onSubmit: (values,) => {
            editPage(page.id, values).then((data) => {
                if (data.errors === false) {
                    formik.resetForm()
                    toast.success(data.message)
                    queryClient.invalidateQueries('admin.pages')
                    queryClient.invalidateQueries(`admin.page.${id}`)
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

    useEffect(() => {
        if (!isLoading && page) {
            formik.setValues({
                title: page.title,
                slug: page.slug,
                content: page.content,
                status: !!page.status
            })
        }
    }, [page])

    if (isLoading)
    {
        return <SectionLoading center={true} />
    }


    return (
        <>
            <h1 className="mb-3">Edit Page</h1>
            <div className="row">
                <div className="col-6">
                    <GoBackButton />
                    <section className="rounded text-bg-light p-4">
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
                                <textarea rows={10} className="form-control" placeholder="Page content here..." id="content" {...formik.getFieldProps("content")} ></textarea>
                            </div>

                            <div className="d-flex mb-3">
                                <Switch onChange={(checked) => formik.setFieldValue("status", checked)} name="accept" checked={formik.values.status} size="small" className="mx-2 mt-1" />

                                <label htmlFor="status" className="form-label" onClick={() => formik.setFieldValue("status", !formik.values.status)} >Published</label>
                            </div>

                            <SuperButton isLoading={formik.isSubmitting} type="submit" className="btn btn-primary" onClick={() => toastFormikErrors(formik.errors)}>Update</SuperButton>
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}
