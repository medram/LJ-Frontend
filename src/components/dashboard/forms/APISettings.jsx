import { useFormik } from "formik"
import * as Yup from "yup"
import { toastFormikErrors } from "../../../utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFloppyDisk, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import SuperButton from "../../SuperButton"
import { saveDashboardSettings } from "../../../api/admin"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import PasswordInput from "../../PasswordInput"
import { registerOpenAIKey } from "../../../api/account"
import { useDemo } from "../../../hooks"


export default function APISettings({ settings })
{
    const { isDemo } = useDemo()
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
            if (isDemo)
                return toast.success("This action isn't allowed on the demo mode!")

            saveDashboardSettings(values).then((data) => {
                if (data?.errors)
                {
                    toast.error(data?.message)
                }
                else
                {
                    // register OpenAI key
                    registerOpenAIKey(values.OPENAI_API_KEY).then(req => {
                        if (!req.data?.errors)
                            toast.success(req.data?.message)
                        else
                            toast.error(req.data?.message)
                    }).catch(err => {
                        if (err.response.data?.errors)
                        {
                            toast.error(err.response.data?.message)
                        }
                        else
                        {
                            toast.error(err.message)
                        }
                    }).finally(() => {
                        queryClient.invalidateQueries("admin.settings")
                        queryClient.invalidateQueries("settings")
                        formik.setSubmitting(false)
                    })
                }
            }).catch(err => {
                toast.error(err)
            }).finally(() => {

            })
        }
    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="alert alert-info"><FontAwesomeIcon icon={faInfoCircle} /> <b>Important:</b> For better/fast performance, it's highly recommended to use a paid OpenAI API key.</div>

            <div className="mb-4">
                <label htmlFor="openai_api_key">OpenAI API Key:</label>
                <PasswordInput placeholder="e.g. sk-xxxxxxxxxxxxxxx" id="openai_api_key" {...formik.getFieldProps("OPENAI_API_KEY")} />
            </div>

            <hr className="my-5 text-muted"/>

            <div className="mb-4">
                <label htmlFor="rapid_api_key">Rapid API Key:</label>
                <PasswordInput placeholder="e.g. 26c895de9emsh9e521eb317edd6ap1a9dc4jsn3f07efsd1f4f" id="rapid_api_key" {...formik.getFieldProps("RAPID_API_KEY")} />
            </div>

            <div className="mb-4">
                <label htmlFor="rapid_api_host">Rapid API Host:</label>
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
