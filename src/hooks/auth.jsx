import { useEffect, useState } from "react"
import { auth, logout } from "../api/auth"
import { useStore } from "../context/StoreContext"


export function useAuth()
{
    const { user, dispatch } = useStore()

    const Authenticate = async (email, password) => {
        let data = await auth(email, password)
        if (data?.success)
        {
            dispatch({type: "UPDATE_USER", user: data.user })
            dispatch({ type: "IS_AUTHENTICATED", payload: true })
        }

        return data
    }

    const Logout = async () => {
        let data = await logout()
        if (data.success)
        {
            dispatch({ type: "UPDATE_USER", user: {} })
            dispatch({ type: "IS_AUTHENTICATED", payload: false })
        }
    }

    return { Authenticate, Logout }
}


export function useUser()
{
    const { isAuthenticated, user } = useStore()

    return { isAuthenticated, isAdmin: user.role == 1, user }
}

