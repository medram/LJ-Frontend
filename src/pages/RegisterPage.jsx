import { useState } from "react";
import { Link } from "react-router-dom";
import Switch from "../components/Switch";
//import Switch from "react-switch";

import BasePage from "./layouts/BasePage";


export default function RegisterPage() {
    const [ checked, toggleSwitch ] = useState(false)

    return (
        <BasePage>
            <section className="container">
                <div className="row my-5 py-5">
                    <div className="col-md-5 m-auto p-5">
                        <h1 className="text-center">Sign Up</h1>
                        <span className="text-muted d-block text-center mb-5">Create a new account</span>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username:</label>
                            <input type="text" id="username" className="form-control form-control-lg" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" id="email" className="form-control form-control-lg" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input type="password" id="password" className="form-control form-control-lg" />
                        </div>
                        <div className="d-flex mb-3">
                            <Switch onChange={() => toggleSwitch((checked) => !checked)} checked={checked} size="small" className="mx-2 mt-1" />
                            <label htmlFor="agree" className="form-label" onClick={() => toggleSwitch((checked) => !checked)}>I read and agree on terms of use & privacy policy of the website.</label>
                        </div>
                        <button className="btn btn-primary btn-lg btn-block my-4">Sign In</button>
                        <span>Have an account? <Link to="/login">Sign In</Link></span>
                    </div>
                </div>
            </section>
        </BasePage>
    )
}
