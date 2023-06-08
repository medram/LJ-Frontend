import { useQuery } from "react-query"
import { currentSubscription, getUserInvoices } from "../api/account"


export function useCurrentSubscription()
{
    const { data, ...rest } = useQuery("user.subscription", currentSubscription, { staleTime: Infinity })

    return { ...rest, subscription: data?.subscription }
}


export function useUserInvoices()
{
    const { data, ...rest } = useQuery("user.invoices", getUserInvoices, { staleTime: Infinity })

    return { ...rest, invoices: data?.invoices }
}
