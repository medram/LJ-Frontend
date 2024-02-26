import APISettings from "@components/dashboard/forms/APISettings"
import { useDashboardSettings } from "@hooks/index"

export default function APIKeysPage()
{
    const { settings } = useDashboardSettings()

    return (
        <>
            <h1 className="mb-3">API Keys</h1>

            <div className="row">
                <div className="col-12 col-md-7">
                    <section className="bg-light rounded p-4">
                        <APISettings settings={settings} />
                    </section>
                </div>
            </div>
        </>
    )
}
