import { saveDashboardSettings } from "@api/admin"
import SuperButton from "@components/SuperButton"
import TablerIcon from "@components/TablerIcon"
import { useDashboardSettings } from "@hooks/index"
import { IconInfoCircle } from "@tabler/icons-react"
import { useCallback, useState } from "react"
import { useQueryClient } from "react-query"
import Select from "react-select"
import { toast } from "react-toastify"


export default function EditTrialForm({ plans, close })
{
    const { settings } = useDashboardSettings()
    const [ selectedPlan, setSelectedPlan ] = useState(0)
    const [ isSubmitting, setSubmitting ] = useState(false)
    const queryClient = useQueryClient()

    const TRIAL_PLANS = ([{ label: "none", value: 0 }]).concat((plans.filter((plan) => plan.billing_cycle === "monthly")).map((plan) => {
        if (plan.billing_cycle === "monthly")
            return {
                label: `${plan.name} (${settings?.CURRENCY_SYMBOL}${plan.price}/month)`,
                value: plan.id
            }
    }))

    const handleSave = useCallback(() => {
        setSubmitting(true)

        saveDashboardSettings({ TRIAL_PLANS: selectedPlan}).then(() => {
            toast.success("Saved successfully.")
            queryClient.invalidateQueries("admin.settings")
            close()
        }).catch(err => {
            toast.warning("Something went wrong!")
        }).finally(() => {
            setSubmitting(false)
        })
    }, [selectedPlan])

    // Default trial
    const DEFAULT_TRIAL_PLAN = TRIAL_PLANS.filter(option => {
        if (option.value === parseInt(settings?.TRIAL_PLANS))
            return option
    }).pop()

    return (
        <div>
            <p>Set a default free subscription plan for new registered users/clients to start with:</p>

            <Select options={TRIAL_PLANS} defaultValue={DEFAULT_TRIAL_PLAN} isSearchable={false} onChange={(option) => setSelectedPlan(option.value)} />

            <div className="alert alert-warning mt-4">
                <TablerIcon icon={IconInfoCircle} /> <b>Warning</b><br />
                New registered users/clients will get a free subscription (the selected one above) as a trial for their first month.
            </div>

            <SuperButton className="btn btn-primary w-100" onClick={handleSave} isLoading={isSubmitting}>
                Save
            </SuperButton>
        </div>
    )
}
