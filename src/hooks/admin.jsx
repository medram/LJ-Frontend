import { useQuery } from "react-query";
import { getCustomers, getPage, getPages, getSubscriptions } from "../api/admin";


export function useCustomers()
{
    const {data, ...rest } = useQuery("admin.customers", getCustomers, {staleTime: Infinity})

    return { customers: data?.customers, ...rest}
}

export function usePages()
{
    const { data, ...rest } = useQuery("admin.pages", getPages, { staleTime: Infinity })

    return { pages: data?.pages, ...rest }
}

export function usePage(id)
{
    const { data, ...rest } = useQuery(`admin.page.${id}`, () => getPage(id), { staleTime: Infinity })
    return {...rest, page: data?.page}
}

export function useSubscriptions()
{
    const { data, ...rest } = useQuery(`admin.subscriptions`, getSubscriptions, { staleTime: Infinity })
    return { ...rest, subscriptions: data?.subscriptions }
}
