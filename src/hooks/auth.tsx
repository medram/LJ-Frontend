import { UserType } from "@/utils/types"
import { auth, logout } from "@api/auth"
import { useLocalStore, useNaiveLocalStorage } from "@hooks/index"
import { useCallback, useEffect } from "react"


export function useAuth() {
    const [user, setUser] = useLocalStore<UserType>("user", {} as UserType)
    const [getToken, setToken] = useNaiveLocalStorage("tk", "")
    const token = getToken()

    useEffect(useCallback(() => {
        if (token == "" && user?.id !== undefined)
        {
            setUser({} as UserType)
        }
    }, []))

    const Authenticate = useCallback(async (email: string, password: string) => {
        let data = await auth(email, password)

        if (!data?.errors) {
            setUser(data.user as UserType)
            setToken(data.token as string)
        }

        return data.user as UserType
    }, [])

    const Logout = useCallback(async () => {
        // to inform the database
        let data = await logout()

        setUser({} as UserType)
        setToken("")
    }, [])

    return { user, setUser, Authenticate, Logout, token }
}

export function useUser()
{
    const { user, setUser } = useAuth()

    return {
        isAuthenticated: ("id" in user && user?.id) ? true : false,
        isAdmin: "role" in user && user?.role == 1,
        user,
        setUser
    }
}

