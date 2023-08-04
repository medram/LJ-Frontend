import { useLocalStorage } from "../hooks"


export default function CookiesAlert({
    message =`Cookies help us improve your website experience, By using our website, you agree to our use of cookies.`,
})
{
    const [ cookiesAccepted, setCookiesAccepted ] = useLocalStorage("cookies-policy", 0)

    if (cookiesAccepted == 1)
        return null

    return (
        <div className="cookie-alert" >
            <div className="cookie-img">
                <img
                    src="https://i.imgur.com/xXUc6kM.png"
                    alt="cookie policy icon"
                />
            </div>
            <div className="cookie-policy">
                {message}

                <div className="cookie-buttons">
                    <button className="btn btn-primary cookie-agree-button" onClick={() => setCookiesAccepted(1)}>Get it</button>
                </div>
            </div>
        </div>
    )
}
