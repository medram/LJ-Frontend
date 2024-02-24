import { DispatchWithoutAction, ReactNode, createContext, useContext } from "react"
import { usePersistedReducer } from "../hooks"
import reducer, { ActionType } from "./reducer"


type DispatchFunction = ((payload: ActionType) => void) | DispatchWithoutAction

type InitialValuesProps = {
    theme: "dark" | "light",
    user: object,
    dispatch: DispatchFunction
    [key: string]: unknown
}

const initialValues: InitialValuesProps = {
    theme: "dark",
    user: {},
    dispatch: (payload) => {}
}

const StoreContext = createContext(initialValues)


export function StoreProvider({ children }: { children: ReactNode }) {
    const [stats, dispatch] = usePersistedReducer(reducer, initialValues)

    return (
        <StoreContext.Provider value={{ ...stats as InitialValuesProps, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContext


// Store React hook

export function useStore()
{
    return useContext(StoreContext)
}
