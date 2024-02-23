import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import { useQuery } from "react-query"
import { getAvailablePaymentMethods, getDashboardSettings, getDemoStatus, getLCInfo, getPage, getPlans, getSettings, getpages } from "../api"
import { getDashboardPlans } from "../api/admin"
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

    return [currentValue, dispatchDecorator] as const
}


function SyncFromLocalStorage(key, initialValues) {
    try {
        let stored = localStorage.getItem(key)
        if (stored !== null) {
            stored = JSON.parse(stored)
            return { ...initialValues, ...stored }
        }
    } catch (error) {

    }
    return initialValues
}

export function usePersistedReducer(reducer, initialValues) {
    const [stats, dispatch] = useReducer(reducer, SyncFromLocalStorage("storedStats", initialValues))
    const [ , SyncToLocalStorage] = useLocalStorage("storedStats", stats)

    useEffect(() => {
        SyncToLocalStorage(stats)
    }, [stats])

    return [stats, dispatch]
}

export function useSettings()
{
    const { data, ...rest } = useQuery("settings", getSettings, { staleTime: Infinity })

    return { ...rest, settings: data?.settings || {} }
}

//############################### DASHBOARD HOOKS ######################################

export function useDashboardSettings() {
    const { data, ...rest } = useQuery("admin.settings", getDashboardSettings, { staleTime: Infinity })

    return { ...rest, settings: data?.settings || {} }
}

export function useDashboardPlans()
{
    const { data, ...rest } = useQuery("admin.plans", getDashboardPlans, { staleTime: Infinity })
    return { ...rest, plans: data?.plans }
}

export function useDashboardPlan(planId)
{
    const { data, ...rest } = useQuery("admin.plans", getDashboardPlans, { staleTime: Infinity })
    const [ plan ] = data?.plans.filter(plan => plan.id === planId)

    return { ...rest, plan }
}

//############################### COMMON HOOKS ######################################

export function usePlans()
{
    const { data, ...rest } = useQuery("plans", getPlans, { staleTime: 1000 * 60 }) // 1 minute
    const plans = data?.plans
    const monthlyPlans = plans?.filter(plan => plan.billing_cycle === "monthly")
    const yearlyPlans = plans?.filter(plan => plan.billing_cycle === "yearly")

    return { ...rest, plans, monthlyPlans, yearlyPlans }
}

export function usePlan(id) {
    const { plans, ...rest } = usePlans()

    return { ...rest, plan: plans?.filter(plan => plan.id == id).pop() }
}

export function useAvailablePaymentMethods()
{
    const { data, ...rest } = useQuery("available_payment_methods", getAvailablePaymentMethods)

    return { ...rest, paymentMethods: data?.payment_methods }
}


export function useEventListener(eventName, defaultValue, callback)
{
    const [ value, setValue ] = useState(defaultValue)


    const handleCallback = useCallback((e) => {
        if (typeof callback === "function")
            setValue(callback({ e, prevValue: value }))
    }, [])

    useEffect(() => {
        window.addEventListener(eventName, handleCallback)

        return () => {
            window.removeEventListener(eventName, handleCallback)
        }
    }, [])

    return [value, setValue]
}


export function useScrollToRef(defaultValue=null)
{
    const ref = useRef(defaultValue)

    const scrollToRef = useCallback(() => {
        setTimeout(() => {
            if (ref.current)
                ref.current.scrollIntoView({ behavior: 'smooth' })
        }, 200)
    }, [])

    return [ref, scrollToRef]
}


export function usePages()
{
    const { data, ...rest } = useQuery("pages", getpages, { staleTime: 60000 })

    return { pages: data?.pages, ...rest }
}


export function usePage(slug: string)
{
    const { data, ...rest } = useQuery(`page.${slug}`, () => getPage(slug), { staleTime: 300000, retry: 1 })

    return { page: data?.page, ...rest }
}

export function useDemo() {
    const { data, ...rest } = useQuery("demo", getDemoStatus)

    return { ...rest, isDemo: (data?.status ? data.status : false) }
}

export function useLCInfo() {
    const { isLoading, data, ...rest } = useQuery("LC", getLCInfo)
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


export function useClickOutside(callback) {
    const ref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
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
