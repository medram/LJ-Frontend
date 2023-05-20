import { useEffect } from "react"
import { useLocalStorage, useLocalStore } from "."
import { auth, logout } from "../api/auth"


export function useAuth() {
    const [isAuthenticated, setAuthenticated] = useLocalStore("isAuth", false)
    const [user, setUser] = useLocalStore("user", {})
    const [token, setToken] = useLocalStorage("tk", "")

    useEffect(() => {
        if (token == "")
        {
            setAuthenticated(false)
        }
    }, [token])

    const Authenticate = async (email, password) => {
        let data = await auth(email, password)

        if (!data?.errors) {
            setUser(data.user)
            setAuthenticated(true)
            setToken(data.token)
        }

        return data
    }

    const Logout = async () => {
        // to inform the database
        let data = await logout()

        setUser({})
        setAuthenticated(false)
        setToken("")
    }

    return { isAuthenticated, user, Authenticate, Logout, token }
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
    const { isAuthenticated, user } = useAuth()

    return { isAuthenticated, isAdmin: user?.role == 1, user }
}

