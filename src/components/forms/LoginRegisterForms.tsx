import { memo, useState } from "react"
import { Link } from "react-router-dom"

import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import ForgotPasswordForm from "./ForgotPasswordForm"


export default memo(function LoginRegisterForms({
    onLogin,
    onRegister,
    onLoginRedirectTo,
    onRegisterRedirectTo
})
{
    const [currentForm, setCurrentForm] = useState("LOGIN") // LOGIN | REGISTER | FORGOT_PASSWORD


    return <>
        {currentForm !== "FORGOT_PASSWORD" && (
            <div className="text-center mb-4">
                <div className="btn-group btn-group-sm">
                    <button type="button" className={["btn btn-primary", currentForm === "REGISTER" && "active"].join(" ")} onClick={() => setCurrentForm("LOGIN")}>Sign In</button>
                    <button type="button" className={["btn btn-primary", currentForm === "LOGIN" && "active"].join(" ")} onClick={() => setCurrentForm("REGISTER")}>Sign Up</button>
                </div>
            </div>
        )}

        { currentForm === "LOGIN" ? <>
            <LoginForm onLogin={onLogin} setCurrentForm={setCurrentForm} onLoginRedirectTo={onLoginRedirectTo} />
            <span>Don't have an account? <Link onClick={() => setCurrentForm("REGISTER")}>Sign Up</Link></span>
        </> : currentForm === "REGISTER" ?
            <>
                <RegisterForm onRegister={onRegister} setCurrentForm={setCurrentForm} onRegisterRedirectTo={onRegisterRedirectTo} />
                <span>Already Have an account? <Link onClick={() => setCurrentForm("LOGIN")}>Sign In</Link></span>
            </> : (
                <ForgotPasswordForm setCurrentForm={setCurrentForm} />
            )}
    </>

})
