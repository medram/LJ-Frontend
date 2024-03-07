import { GeneralSettingsType, PageType, PlanType, SecretSettingsType } from "@/utils/types"
import { getDashboardPlans } from "@api/admin"
import {
    getAvailablePaymentMethods,
    getDashboardSettings,
    getDemoStatus,
    getLCInfo,
    getPage,
    getPlans,
    getSettings,
    getpages
} from "@api/index"
import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import { useQuery } from "react-query"
import { useStore } from "../context/StoreContext"


export function useLocalStorage<T>(key: string, value: T) {
    const [persistedValue, setPersistedValue] = useState<T>(() => {
        try {
            let storedValue = localStorage.getItem(key)
            if (storedValue != null)
                return JSON.parse(storedValue) as T
        } catch (error) {

        }

        return value
    })

    // Sync values to localStorage
    const setPersistedValueDecorator = (value: T) => {
        localStorage.setItem(key, JSON.stringify(value))
        return setPersistedValue(value)
    }

    return [persistedValue, setPersistedValueDecorator] as const
}


export function useNaiveLocalStorage<T>(key: string, value: T)
{
    const getter = useCallback(() => {
        let storedValue = localStorage.getItem(key)

        try {
            if (storedValue != null)
                return JSON.parse(storedValue) as T
        } catch (error) {

        }

        return value
    }, [])

    const setter = useCallback((value: ((val: T) => T) | T) => {
        return localStorage.setItem(key, JSON.stringify(value))
    }, [])

    // Register the default value
    if (getter() === null)
        setter(value)
    return [getter, setter] as const
}


export function useLocalStore<T>(key: string, defaultValue: T)
{
    let { [key]: currentValue, dispatch } = useStore()

    if (currentValue === undefined)
    {
        currentValue = defaultValue
    }

    const dispatchDecorator = (newValue: T) => {
        return dispatch({ type: "OVERRIDE_STORE", payload: { [key]: newValue} })
    }

    return [currentValue as T, dispatchDecorator] as const
}


function SyncFromLocalStorage(key: string, initialValues: object) {
    try {
        let stored = localStorage.getItem(key)
        if (stored !== null) {
            let parsed: object = JSON.parse(stored)
            return { ...initialValues, ...parsed }
        }
    } catch (error) {

    }
    return initialValues
}

export function usePersistedReducer(reducer: any, initialValues: object) {
    const [stats, dispatch] = useReducer(reducer, SyncFromLocalStorage("storedStats", initialValues))
    const [ , SyncToLocalStorage] = useLocalStorage("storedStats", stats as object)

    useEffect(() => {
        SyncToLocalStorage(stats as object)
    }, [stats])

    return [stats, dispatch] as const
}

export function useSettings()
{
    const { data, ...rest } = useQuery("settings", getSettings, { staleTime: Infinity, suspense: true })
    const settings: GeneralSettingsType = data?.settings || {}

    return { ...rest, settings }
}

//############################### DASHBOARD HOOKS ######################################

export function useDashboardSettings() {
    const { data, ...rest } = useQuery("admin.settings", getDashboardSettings, {
        staleTime: Infinity,
        suspense: true
    })

    // Parse available plugins as pluginType[]
    if (data?.settings && data?.settings?.CHAT_AVAILABLE_PLUGINS && typeof data?.settings?.CHAT_AVAILABLE_PLUGINS === "string")
        data.settings.CHAT_AVAILABLE_PLUGINS = JSON.parse(data?.settings?.CHAT_AVAILABLE_PLUGINS)

    if (data?.settings && data?.settings?.SELECTED_PLUGINS && typeof data?.settings?.SELECTED_PLUGINS === "string")
        data.settings.SELECTED_PLUGINS = JSON.parse(data?.settings?.SELECTED_PLUGINS)


    const settings: SecretSettingsType = data?.settings || {}

    return { ...rest, settings }
}

export function useDashboardPlans()
{
    const { data, ...rest } = useQuery("admin.plans", getDashboardPlans, { staleTime: Infinity, suspense: true })
    const plans: PlanType[] = data?.plans

    return { ...rest, plans }
}

export function useDashboardPlan(planId: number)
{
    const { data, ...rest } = useQuery("admin.plans", getDashboardPlans, { staleTime: Infinity })
    const plan: PlanType | null = data?.plans.find((plan: PlanType) => plan.id === planId) || null

    return { ...rest, plan }
}

//############################### COMMON HOOKS ######################################

export function usePlans()
{
    const { data, ...rest } = useQuery("plans", getPlans, { staleTime: 1000 * 60, suspense: true }) // 1 minute
    const plans: PlanType[] = data?.plans
    const monthlyPlans: PlanType[] = plans?.filter((plan: PlanType) => "billing_cycle" in plan && plan.billing_cycle === "monthly")
    const yearlyPlans: PlanType[] = plans?.filter((plan: PlanType) => "billing_cycle" in plan && plan.billing_cycle === "yearly")

    return { ...rest, plans, monthlyPlans, yearlyPlans }
}

export function usePlan(id: number) {
    const { plans, ...rest } = usePlans()
    const plan: PlanType | null = plans?.find((plan: PlanType) => plan.id == id) || null
    return { ...rest, plan }
}

export function useAvailablePaymentMethods()
{
    const { data, ...rest } = useQuery("available_payment_methods", getAvailablePaymentMethods)

    return { ...rest, paymentMethods: data?.payment_methods }
}


export function useEventListener<T>(eventName: string, defaultValue: T, callback: Function)
{
    const [ value, setValue ] = useState(defaultValue)

    const handleCallback = useCallback((e: any) => {
        if (typeof callback === "function")
            setValue(callback({ e, prevValue: value }))
    }, [])

    useEffect(() => {
        window.addEventListener(eventName, handleCallback)

        return () => {
            window.removeEventListener(eventName, handleCallback)
        }
    }, [])

    return [value, setValue] as const
}


export function useScrollToRef<T>(defaultValue: T | null = null)
{
    const ref = useRef<T>(defaultValue)

    const scrollToRef = useCallback(() => {
        setTimeout(() => {
            if (ref.current != null)
                ref.current.scrollIntoView({ behavior: 'smooth' })
        }, 200)
    }, [])

    return [ref, scrollToRef] as const
}


export function usePages()
{
    const { data, ...rest } = useQuery("pages", getpages, { staleTime: 60000 })
    const pages: PageType[] = data?.pages

    return { pages, ...rest }
}


export function usePage(slug: string)
{
    const { data, ...rest } = useQuery(`page.${slug}`, () => getPage(slug), {
        staleTime: 300000,
        retry: 1,
        suspense: true
    })

    const page: PageType = data?.page
    return { page, ...rest }
}

export function useDemo() {
    const { data, ...rest } = useQuery("demo", getDemoStatus, { suspense: true })
    const isDemo: boolean = (data?.status ? data.status : false)

    return { ...rest, isDemo }
}

export function useLCInfo() {
    const { isLoading, data, ...rest } = useQuery("LC", getLCInfo, { suspense: true })
    let isRegularLicense = false
    let isExtendedLicense = false

    if (!isLoading)
    {
        const info = JSON.parse(atob(atob(data?.info ? data?.info : "")))

        isRegularLicense = info?.type == "RL"
        isExtendedLicense = info?.type == "EL"
    }

    return { ...rest, isLoading, isRegularLicense, isExtendedLicense }
}


export function useClickOutside(callback: Function) {
    const ref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target))
            {
                if (typeof callback === "function")
                {
                    callback(event)
                }
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [callback])

    return ref
}
