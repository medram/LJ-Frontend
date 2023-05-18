import { useContext, useEffect, useReducer, useState } from "react"
import { useQuery } from "react-query"
import { getAvailablePaymentMethods, getDashboardSettings, getPlans, getSettings } from "../api"
import StoreContext from "../context/StoreContext"
import { getDashboardPlans } from "../api/admin"


export function useLocalStorage(key, value = null) {
    const [persistedValue, SetPersistedValue] = useState(() => {
        try {
            //console.log("localStorage useState function called!")
            let storedValue = localStorage.getItem(key)
            if (storedValue !== null)
                return JSON.parse(storedValue)
        } catch (error) {
            return value
        }
        return value
    })

    // Sync values to localStorage
    useEffect(() => {
        //console.log("Sync to localStorage!", persistedValue)
        localStorage.setItem(key, JSON.stringify(persistedValue))
    }, [persistedValue])

    return [persistedValue, SetPersistedValue]
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
    const { data, ...rest } = useQuery("plans", getPlans, { staleTime: 1000 * 60 })
    const plans = data?.plans
    const monthlyPlans = plans?.filter(plan => plan.billing_cycle === "monthly")
    const yearlyPlans = plans?.filter(plan => plan.billing_cycle === "yearly")

    return { ...rest, plans, monthlyPlans, yearlyPlans }
}

export function usePlan(id) {
    const [plan, setPlan] = useState(null)
    const { plans, ...rest } = usePlans()

    useEffect(() => {
        if (plans?.length)
        {
            const [ plan ] = plans?.filter(plan => plan.id == id)
            setPlan(plan)
        }
    }, [plans])

    return { ...rest, plan }
}

export function useAvailablePaymentMethods()
{
    const { data, ...rest } = useQuery("available_payment_methods", getAvailablePaymentMethods)

    return { ...rest, paymentMethods: data?.payment_methods }
}

// export function useTheme() {
//     const { theme, dispatch } = useContext(StoreContext)

//     function toggleTheme() {
//         console.log("Toggle theme")
//         dispatch({ type: "TOGGLE_THEME" })
//     }

//     return [theme, toggleTheme]
// }

// export function useAuth() {
//     const { isAuthenticated, dispatch } = useContext(StoreContext)

//     function setAuthenticated(value) {
//         dispatch({ type: "IS_AUTHENTICATED", payload: value })
//     }

//     return { isAuthenticated, setAuthenticated }
// }
