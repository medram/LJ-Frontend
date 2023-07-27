import { useCallback, useEffect } from "react"
import { useLocalStore, useNaiveLocalStorage } from "."
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

export function useUser()
{
    const { isAuthenticated, user, setUser } = useAuth()

    return { isAuthenticated: user?.id ? true : false, isAdmin: user?.role == 1, user, setUser }
}

