import { useFormik } from "formik"
import * as Yup from "yup"
import { toastFormikErrors } from "../../../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons"
import SuperButton from "../../SuperButton"
import { saveDashboardSettings } from "../../../api/admin"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import PasswordInput from "../../PasswordInput"


export default function APISettings({ settings })
{
    const queryClient = useQueryClient()

    const formik = useFormik({
        initialValues: {
            OPENAI_API_KEY: settings.OPENAI_API_KEY,
            RAPID_API_KEY: settings.RAPID_API_KEY,
            RAPID_API_HOST: settings.RAPID_API_HOST
        },
        validationSchema: Yup.object({
            OPENAI_API_KEY: Yup.string().required("The OpenAI API Key is required"),
            RAPID_API_KEY: Yup.string().required("The Rapid API Key is required"),
            RAPID_API_HOST: Yup.string().required("The Rapid API Host is required")
        }),
        onSubmit: (values) => {
            saveDashboardSettings(values).then((data) => {
                if (data?.errors) {
                    toast.error(data?.message)
                }
                else {
                    queryClient.invalidateQueries("admin.settings")
                    queryClient.invalidateQueries("settings")
                    toast.success(data.message)
                }
            }).catch(err => {
                toast.error(err)
            }).finally(() => {
                formik.setSubmitting(false)
            })
        }
    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
                <label htmlFor="openai_api_key">OpenAI API Key:</label>
                <PasswordInput placeholder="e.g. sk-xxxxxxxxxxxxxxx" id="openai_api_key" {...formik.getFieldProps("OPENAI_API_KEY")} />
            </div>

            <div className="mb-4">
                <label htmlFor="rapid_api_key">Rapid API Key:</label>
                <PasswordInput placeholder="e.g. 26c895de9emsh9e521eb317edd6ap1a9dc4jsn3f07efsd1f4f" id="rapid_api_key" {...formik.getFieldProps("RAPID_API_KEY")} />
            </div>

            <div className="mb-4">
                <label htmlFor="rappid_api_host">Rapid API Host:</label>
                <input type="text" className="form-control" placeholder="e.g. askpdf1.p.rapidapi.com" id="rapid_api_host" {...formik.getFieldProps("RAPID_API_HOST")} />
            </div>

            <div className="d-flex flex-row-reverse gap-3 mb-4 mt-5">
                <SuperButton type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting} className="btn btn-primary" onClick={() => toastFormikErrors(formik.errors)}>
                    <FontAwesomeIcon icon={faFloppyDisk} /> Save
                </SuperButton>
            </div>
        </form>
    )
}
