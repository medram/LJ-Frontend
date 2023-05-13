import { useContext, useEffect, useReducer, useState } from "react"
import { useQuery } from "react-query"
import { getDashboardSettings, getSettings } from "../api"
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
    const { data: settings, ...rest } = useQuery("settings", getSettings, {staleTime: Infinity})

    return { ...rest, settings }
}

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
