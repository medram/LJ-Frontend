import AISettingsForm from "@/components/dashboard/forms/AISettingsForm"
import { useDashboardSettings } from "@hooks/index"

export default function AISettingsPage()
{
    const { settings } = useDashboardSettings()

    return (
        <>
            <h1 className="mb-3">AI Settings</h1>

            <div className="row">
                <div className="col-12 col-md-7">
                    <section className="bg-light rounded p-4">
                        <AISettingsForm settings={settings} />
                    </section>
                </div>
            </div>
        </>
    )
}
