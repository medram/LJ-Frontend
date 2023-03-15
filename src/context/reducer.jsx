export default function reducer(stats, action) {
    switch (action.type) {
        case "TOGGLE_THEME":
            let newTheme = (stats.theme === "dark") ? "light" : "dark"
            return { ...stats, theme: newTheme }
        case "IS_AUTHENTICATED":
            return { ...stats, isAuthenticated: action.payload }
        case "UPDATE_USER":
            return {...stats, user: action.user }

        default:
            break;
    }
}
