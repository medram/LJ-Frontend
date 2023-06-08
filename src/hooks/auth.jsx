import { useCallback, useEffect, useMemo, useState } from "react"
import { useLocalStorage, useLocalStore, useNaiveLocalStorage } from "."
import { auth, logout } from "../api/auth"


export function useAuth() {
    const [user, setUser] = useLocalStore("user", {})
    const [getToken, setToken] = useNaiveLocalStorage("tk", "")
    const token = getToken()

    useEffect(useCallback(() => {
        if (token == "" && user?.id !== undefined)
        {
            setUser({})
        }
    }, []))

    const Authenticate = useCallback(async (email, password) => {
        let data = await auth(email, password)

        if (!data?.errors) {
            setUser(data.user)
            setToken(data.token)
        }

        return data
    }, [])

    const Logout = useCallback(async () => {
        // to inform the database
        let data = await logout()

        setUser({})
        setToken("")
    }, [])

    return { user, setUser, Authenticate, Logout, token }
}

// export function useAuth()
// {
//     const { dispatch } = useStore()
//     const [ token, setToken ] = useLocalStorage("tk", "")

//     const Authenticate = async (email, password) => {
//         let data = await auth(email, password)
//         if (!data?.errors)
//         {
//             dispatch({type: "UPDATE_USER", user: data.user })
//             dispatch({ type: "IS_AUTHENTICATED", payload: true })
//             setToken(data.token)
//         }

//         return data
//     }

//     const Logout = async () => {
//         // to inform the database
//         let data = await logout()

//         dispatch({ type: "UPDATE_USER", user: {} })
//         dispatch({ type: "IS_AUTHENTICATED", payload: false })
//         setToken("")
//     }

//     return { Authenticate, Logout, token }
// }


export function useUser()
{
    const { isAuthenticated, user, setUser } = useAuth()

    return { isAuthenticated: user?.id ? true : false, isAdmin: user?.role == 1, user, setUser }
}

