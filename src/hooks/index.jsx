import { useContext, useEffect, useReducer, useState } from "react"
import StoreContext from "../context/StoreContext"


export function useTheme() {
    const { theme, dispatch } = useContext(StoreContext)

    function toggleTheme() {
        console.log("Toggle theme")
        dispatch({ type: "TOGGLE_THEME" })
    }

    return [theme, toggleTheme]
}

export function useAuth() {
    const { isAuthenticated, dispatch } = useContext(StoreContext)

    function setAuthenticated(value) {
        dispatch({ type: "IS_AUTHENTICATED", payload: value })
    }

    return { isAuthenticated, setAuthenticated }
}

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
