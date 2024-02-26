import { CustomerType, PageType, SubscriptionType } from "@/utils/types";
import { useQuery } from "react-query";
import { checkLC, getCustomers, getDashboardAnalytics, getPage, getPages, getSubscriptions } from "../api/admin";


export function useCustomers()
{
    const {data, ...rest } = useQuery("admin.customers", getCustomers, { staleTime: Infinity, suspense: true })
    const customers: CustomerType[] = data?.customers
    return { customers, ...rest}
}

export function usePages()
{
    const { data, ...rest } = useQuery("admin.pages", getPages, { staleTime: Infinity, suspense: true })
    const pages: PageType[] = data?.pages
    return { pages, ...rest }
}

export function usePage(id: number)
{
    const { data, ...rest } = useQuery(`admin.page.${id}`, () => getPage(id), { staleTime: Infinity })
    const page: PageType = data?.page
    return {...rest, page}
}

export function useSubscriptions()
{
    const { data, ...rest } = useQuery(`admin.subscriptions`, getSubscriptions, { staleTime: Infinity, suspense: true })
    const subscriptions: SubscriptionType[] = data?.subscriptions
    return { ...rest, subscriptions }
}

export function useDashboardAnalytics()
{
    const { data, ...rest } = useQuery(`admin.analytics`, getDashboardAnalytics, { staleTime: 60000, suspense: true })

    return { ...rest, analytics: (data?.analytics ? data.analytics: {}) }
}

export function useLC()
{
    const { data, ...rest } = useQuery(`admin.LC`, checkLC, { suspense: true })

    return { ...rest, isActive: ((data?.errors == false && data?.message === "LCD") ? true : false) }
}
