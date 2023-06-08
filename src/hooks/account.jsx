import { useQuery } from "react-query"
import { currentSubscription } from "../api/account"


export function useCurrentSubscription()
{
    const { data, ...rest } = useQuery("user.subscription", currentSubscription, { staleTime: Infinity })

    return { subscription: data?.subscription, ...rest }
}
