import { useEffect, useState } from "react"
import { useLocalStorage } from "."
import { auth, logout } from "../api/auth"
import { useStore } from "../context/StoreContext"


export function useAuth()
{
    const { dispatch } = useStore()
    const [ token, setToken ] = useLocalStorage("tk", "")

    const Authenticate = async (email, password) => {
        let data = await auth(email, password)
        if (!data?.errors)
        {
            dispatch({type: "UPDATE_USER", user: data.user })
            dispatch({ type: "IS_AUTHENTICATED", payload: true })
            setToken(data.token)
        }

        return data
    }

    const Logout = async () => {
        // to inform the database
        let data = await logout()

        dispatch({ type: "UPDATE_USER", user: {} })
        dispatch({ type: "IS_AUTHENTICATED", payload: false })
        setToken("")
    }

    return { Authenticate, Logout, token }
}


export function useUser()
{
    const { isAuthenticated, user } = useStore()

    return { isAuthenticated, isAdmin: user.role == 1, user }
}

