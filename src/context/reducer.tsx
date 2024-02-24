export type ActionType = {
    type: string,
    payload: object
}

export default function reducer(stats: object, action: ActionType): object {
    switch (action.type) {
        case "OVERRIDE_STORE":
            return {...stats, ...action.payload}

        default:
            return {}
    }
}
