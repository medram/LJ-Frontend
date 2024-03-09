import Switch from "@/components/Switch"
import { PluginType, SecretSettingsType, SelectedPluginType } from "@/utils/types"
import { updateAIModelSettings } from "@api/account"
import { saveDashboardSettings } from "@api/admin"
import { faFloppyDisk, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDemo } from "@hooks/index"
import { AVAILABLE_AI_CHAT_MODELS, AVAILABLE_AI_MODELS, toastFormikErrors } from "@utils/index"
import { useFormik } from "formik"
import { useMemo } from "react"
import { useQueryClient } from "react-query"
import Select from "react-select"
import { toast } from "react-toastify"
import * as Yup from "yup"
import SuperButton from "../../SuperButton"


export default function AISettingsForm({ settings }: { settings: SecretSettingsType })
{
    const { isDemo } = useDemo()
    const queryClient = useQueryClient()
    const always_active_plugins: string[] = ["DocumentPlugin", "DocumentSummarizationPlugin"]

    const getInitialValues = useMemo(() => {
        let initialValues: {[key: string]: unknown} = {
            CHAT_AGENT_MODEL: settings.CHAT_AGENT_MODEL,
            CHAT_AGENT_MODEL_TEMP: settings.CHAT_AGENT_MODEL_TEMP,

            CHAT_TOOLS_MODEL: settings.CHAT_TOOLS_MODEL,
            CHAT_TOOLS_MODEL_TEMP: settings.CHAT_TOOLS_MODEL_TEMP,

            CHAT_PLANNER_AGENT_MODEL: settings.CHAT_PLANNER_AGENT_MODEL,
            CHAT_PLANNER_AGENT_MODEL_TEMP: settings.CHAT_PLANNER_AGENT_MODEL_TEMP,
        }

        // Add plugin values
        let selectedPluginNames: string[] = settings.SELECTED_PLUGINS.map((p: SelectedPluginType) => p.name)

        settings.CHAT_AVAILABLE_PLUGINS.map((plugin: PluginType) => {
            initialValues[`CHAT_PLUGIN_${plugin.name}`] = always_active_plugins.includes(plugin.name) || selectedPluginNames.includes(plugin.name)
        })

        return initialValues
    }, [settings])

    const getValidatorsSchema = useMemo(() => {
        const validators: Yup.ObjectShape = {
            CHAT_AGENT_MODEL: Yup.string().required("The Chat Agent Model is required"),
            CHAT_AGENT_MODEL_TEMP: Yup.number().required("The Agent Model Temperature is required").min(0).max(2),

            CHAT_TOOLS_MODEL: Yup.string().required("The Chat Plugins Model is required"),
            CHAT_TOOLS_MODEL_TEMP: Yup.number().required("The Plugins Model Temperature is required").min(0).max(2),

            CHAT_PLANNER_AGENT_MODEL: Yup.string().required("The Chat Planner Model is required"),
            CHAT_PLANNER_AGENT_MODEL_TEMP: Yup.number().required("The Planner Model Temperature is required").min(0).max(2),
        }

        // Add plugin values
        settings.CHAT_AVAILABLE_PLUGINS.map((plugin: PluginType) => {
            validators[`CHAT_PLUGIN_${plugin.name}`] = Yup.boolean()
        })

        return validators
    }, [settings])

    const formik = useFormik({
        initialValues: getInitialValues,
        enableReinitialize: true,
        validationSchema: Yup.object(getValidatorsSchema),
        onSubmit: (values) => {
            if (isDemo)
                return toast.success("This action isn't allowed on the demo mode!")

            // Before saving, we need to change plugin
            const selectedPlugins: SelectedPluginType[] = settings.CHAT_AVAILABLE_PLUGINS.filter((p: PluginType) => {
                let active = values[`CHAT_PLUGIN_${p.name}`] === true
                delete values[`CHAT_PLUGIN_${p.name}`] // Delete this from payload
                return active
            }).map((p: PluginType) => ({
                name: p.name,
                // Could have extra plugin info/settings
            } as SelectedPluginType))

            // Add SELECTED_PLUGINS to the payload
            values.SELECTED_PLUGINS = JSON.stringify(selectedPlugins)

            saveDashboardSettings(values).then((data) => {
                if (data?.errors)
                {
                    toast.error(data?.message)
                }
                else
                {
                    // update AI Model settings
                    updateAIModelSettings().then(req => {
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

    const selectedChatPlannerAgentModel = {
        label: settings.CHAT_PLANNER_AGENT_MODEL,
        value: settings.CHAT_PLANNER_AGENT_MODEL
    }

    const selectedChatSummarizationModel = {
        label: settings.CHAT_TOOLS_MODEL,
        value: settings.CHAT_TOOLS_MODEL
    }


    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="row mb-3">
                <div className="col-md-12">
                    <h4 className="mb-3">ChatBot Model Settings</h4>
                </div>
                <div className="mb-6 col-md-6">
                    <label htmlFor="openai-model">Chat Agent Model:</label>

                    <Select options={AVAILABLE_AI_CHAT_MODELS} id="openai-model" defaultValue={selectedChatAgentModel} onChange={(option) => formik.setFieldValue("CHAT_AGENT_MODEL", option.value)} />
                </div>
                <div className="mb-6 col-md-5">
                    <label htmlFor="chat_agent_model_temp">Temperature <FontAwesomeIcon icon={faInfoCircle} title="Value between 0 and 1 (0 = precise | 1 = Creative)" /> :</label>
                    <input type="number" min={0} max={2} step={0.1} className="form-control" id="chat_agent_model_temp" {...formik.getFieldProps("CHAT_AGENT_MODEL_TEMP")} />
                </div>
            </div>


            <div className="row mb-3">
                <div className="mb-6 col-md-6">
                    <label htmlFor="chat_planner_agent">Planner Agent Model:</label>

                    <Select options={AVAILABLE_AI_CHAT_MODELS} id="chat_planner_agent" defaultValue={selectedChatPlannerAgentModel} onChange={(option) => formik.setFieldValue("CHAT_PLANNER_AGENT_MODEL", option.value)} />
                </div>
                <div className="mb-6 col-md-5">
                    <label htmlFor="chat_planner_agent_model_temp">Temperature <FontAwesomeIcon icon={faInfoCircle} title="Value between 0 and 1 (0 = precise | 1 = Creative)" /> :</label>
                    <input type="number" min={0} max={2} step={0.1} className="form-control" id="chat_planner_agent_model_temp" {...formik.getFieldProps("CHAT_PLANNER_AGENT_MODEL_TEMP")} />
                </div>
            </div>

            <div className="row mb-3">
                <div className="mb-6 col-md-6">
                    <label htmlFor="openai-sum-model">Default Plugins Model <FontAwesomeIcon icon={faInfoCircle} title="Used by plugins" />:</label>

                    <Select options={AVAILABLE_AI_MODELS} id="openai-sum-model" defaultValue={selectedChatSummarizationModel} onChange={(option) => formik.setFieldValue("CHAT_TOOLS_MODEL", option.value)} />
                </div>
                <div className="mb-6 col-md-5">
                    <label htmlFor="chat_TOOLS_model_temp">Temperature <FontAwesomeIcon icon={faInfoCircle} title="Value between 0 and 1 (0 = precise | 1 = Creative)" /> :</label>
                    <input type="number" min={0} max={2} step={0.1} className="form-control" id="chat_TOOLS_model_temp" {...formik.getFieldProps("CHAT_TOOLS_MODEL_TEMP")} />
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-12">
                    <h4 className="mb-3">Available Plugins for ChatBot to Use.</h4>
                </div>
                <div className="col-md-12">
                    <div className="plugin-list">
                        {settings.CHAT_AVAILABLE_PLUGINS.map((plugin: PluginType, i) => {
                            return (
                                <div className="plugin" key={i}>
                                    <div>
                                        <span className="title">{plugin.name} {plugin.beta && (
                                            <span className="badge text-bg-info text-white">beta</span>
                                        )}</span>
                                        <div>{plugin.desc}</div>
                                    </div>
                                    <div>
                                        {!always_active_plugins.includes(plugin.name)? (
                                            <Switch
                                                onChange={(checked: boolean) => {
                                                    formik.setFieldValue(`CHAT_PLUGIN_${plugin.name}`, always_active_plugins.includes(plugin.name) ? true : !!checked)
                                                }}
                                                name={`CHAT_PLUGIN_${plugin.name}`}
                                                checked={formik.values[`CHAT_PLUGIN_${plugin.name}`]}
                                                size={30}
                                                className="mx-2 mt-1"
                                                disabled={always_active_plugins.includes(plugin.name)}
                                            />
                                        ) : (
                                            <span className="badge text-bg-success">Always ON</span>
                                        ) }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="d-flex flex-row-reverse gap-3 mb-4 mt-2">
                <SuperButton type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting} className="btn btn-primary" onClick={() => toastFormikErrors(formik.errors)}>
                    <FontAwesomeIcon icon={faFloppyDisk} /> Save
                </SuperButton>
            </div>
        </form>
    )
}
