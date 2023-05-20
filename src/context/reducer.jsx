export default function reducer(stats, action) {
    switch (action.type) {
        case "OVERRIDE_STORE":
            return {...stats, ...action.payload}

        default:
            break;
    }
}
