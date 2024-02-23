import { useFormik } from "formik"
import * as Yup from "yup"
import Select from "react-select"
import { faFloppyDisk, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { AVAILABLE_AI_CHAT_MODELS, AVAILABLE_AI_MODELS, toastFormikErrors } from "../../../utils"
import SuperButton from "../../SuperButton"
import { saveDashboardSettings } from "../../../api/admin"
import PasswordInput from "../../PasswordInput"
import { updateAIModelSettings } from "../../../api/account"
import { useDemo } from "../../../hooks"


export default function APISettings({ settings })
{
    const { isDemo } = useDemo()
    const queryClient = useQueryClient()

    const formik = useFormik({
        initialValues: {
            OPENAI_API_KEY: settings.OPENAI_API_KEY,
            CHAT_AGENT_MODEL: settings.CHAT_AGENT_MODEL,
            CHAT_AGENT_MODEL_TEMP: settings.CHAT_AGENT_MODEL_TEMP,
            CHAT_TOOLS_MODEL: settings.CHAT_TOOLS_MODEL,
            CHAT_TOOLS_MODEL_TEMP: settings.CHAT_TOOLS_MODEL_TEMP,

            RAPID_API_KEY: settings.RAPID_API_KEY,
            RAPID_API_HOST: settings.RAPID_API_HOST
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            OPENAI_API_KEY: Yup.string().required("The OpenAI API Key is required"),
            CHAT_AGENT_MODEL: Yup.string().required("The Chat Agent Model is required"),
            CHAT_AGENT_MODEL_TEMP: Yup.number().required("The Agent Model Temperature is required").min(0).max(2),
            CHAT_TOOLS_MODEL: Yup.string().required("The Chat Summarization Model is required"),
            CHAT_TOOLS_MODEL_TEMP: Yup.number().required("The Summarization Model Temperature is required").min(0).max(2),

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
                    const payload = {
                        openai_key: values.OPENAI_API_KEY,
                        chat_agent_model: values.CHAT_AGENT_MODEL,
                        chat_agent_model_temp: values.CHAT_AGENT_MODEL_TEMP,
                        chat_tools_model: values.CHAT_TOOLS_MODEL,
                        chat_tools_model_temp: values.CHAT_TOOLS_MODEL_TEMP,
                    }

                    // update AI Model settings
                    updateAIModelSettings(payload).then(req => {
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

    const selectedChatAgentModel = {
        label: settings.CHAT_AGENT_MODEL,
        value: settings.CHAT_AGENT_MODEL
    }

    const selectedChatSummarizationModel = {
        label: settings.CHAT_TOOLS_MODEL,
        value: settings.CHAT_TOOLS_MODEL
    }


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="alert alert-info"><FontAwesomeIcon icon={faInfoCircle} /> <b>Important:</b> For better/fast performance, it's highly recommended to use a paid OpenAI API key.</div>

            <div className="mb-4">
                <label htmlFor="openai_api_key">OpenAI API Key:</label>
                <PasswordInput placeholder="e.g. sk-xxxxxxxxxxxxxxx" id="openai_api_key" {...formik.getFieldProps("OPENAI_API_KEY")} />
            </div>

            <div className="row mb-3">
                <div className="mb-6 col-md-6">
                    <label htmlFor="openai-model">Chat Agent Model:</label>

                    <Select options={AVAILABLE_AI_CHAT_MODELS} id="openai-model" defaultValue={selectedChatAgentModel} onChange={(option) => formik.setFieldValue("CHAT_AGENT_MODEL", option.value)} />
                </div>
                <div className="mb-6 col-md-5">
                    <label htmlFor="chat_agent_model_temp">Temperature <FontAwesomeIcon icon={faInfoCircle} title="Value between 0 and 1 (0 = precise | 1 = Creative)" /> :</label>
                    <input type="number" min={0} max={2} step={0.1} className="form-control" id="chat_agent_model_temp" {...formik.getFieldProps("CHAT_AGENT_MODEL_TEMP")} />
                </div>
            </div>

            <div className="row">
                <div className="mb-6 col-md-6">
                    <label htmlFor="openai-sum-model">Chat Tools Model <FontAwesomeIcon icon={faInfoCircle} title="Tools for answering and summarization." />:</label>

                    <Select options={AVAILABLE_AI_MODELS} id="openai-sum-model" defaultValue={selectedChatSummarizationModel} onChange={(option) => formik.setFieldValue("CHAT_TOOLS_MODEL", option.value)} />
                </div>
                <div className="mb-6 col-md-5">
                    <label htmlFor="chat_TOOLS_model_temp">Temperature <FontAwesomeIcon icon={faInfoCircle} title="Value between 0 and 1 (0 = precise | 1 = Creative)" /> :</label>
                    <input type="number" min={0} max={2} step={0.1} className="form-control" id="chat_TOOLS_model_temp" {...formik.getFieldProps("CHAT_TOOLS_MODEL_TEMP")} />
                </div>
            </div>

            <hr className="my-5 text-muted"/>

            <div className="mb-4">
                <label htmlFor="rapid_api_key">Rapid API Key:</label>
                <PasswordInput placeholder="e.g. 26c895de9emsh9e521eb317edd6ap1a9dc4jsn3f07efsd1f4f" id="rapid_api_key" {...formik.getFieldProps("RAPID_API_KEY")} />
            </div>

            <div className="mb-4">
                <label htmlFor="rapid_api_host">Rapid API Host:</label>
                <input type="text" className="form-control" placeholder="e.g. askpdf1.p.rapidapi.com" id="rapid_api_host" {...formik.getFieldProps("RAPID_API_HOST")} />
                <small><a href="https://docs.mr4web.com/chatpdf/how-to-get-rapidapi-keys" target="_blank">How to get my Rapid API key?</a></small>
            </div>

            <div className="d-flex flex-row-reverse gap-3 mb-4 mt-5">
                <SuperButton type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting} className="btn btn-primary" onClick={() => toastFormikErrors(formik.errors)}>
                    <FontAwesomeIcon icon={faFloppyDisk} /> Save
                </SuperButton>
            </div>
        </form>
    )
}
