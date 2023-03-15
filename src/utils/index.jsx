import { toast } from "react-toastify";


export function toastFormikErrors(errors)
{
    if (Object.keys(errors).length)
    {
        toast.error(Object.values(errors).slice(0, 1).pop())
    }
}
