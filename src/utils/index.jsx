import { toast } from "react-toastify";


export function toastFormikErrors(errors)
{
    if (Object.keys(errors).length)
    {
        toast.error(Object.values(errors).slice(0, 1).pop())
    }
}

export function getAvailableTimezones()
{
    return (["UTC"]).concat(Intl.supportedValuesOf('timeZone'));
}

export const AVAILABLE_TIMEZONES_OPTIONS = getAvailableTimezones().map(timezone => ({label: timezone, value: timezone}))


export function datetimeFormat(datetime)
{
    return new Date(datetime).toLocaleString()
}
