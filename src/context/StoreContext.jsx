import { createContext } from "react"
import { usePersistedReducer } from "../hooks"
import reducer from "./reducer"

const initialValues = {
    theme: "dark",
    isAuthenticated: false
}

const StoreContext = createContext(initialValues)


export function StoreProvider({ children }) {
    const [stats, dispatch] = usePersistedReducer(reducer, initialValues)

    return (
        <StoreContext.Provider value={{ ...stats, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContext
