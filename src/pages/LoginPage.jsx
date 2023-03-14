import { Link } from "react-router-dom";
import BasePage from "./layouts/BasePage";

export default function LoginPage() {
    return (
        <BasePage>
            <section className="container">
                <div className="row my-5 py-5">
                    <div className="col-md-5 m-auto p-5">
                        <h1 className="text-center mb-5">Sign In</h1>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" id="email" className="form-control form-control-lg" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input type="password" id="password" className="form-control form-control-lg" />
                        </div>
                        <button className="btn btn-primary btn-lg btn-block my-4">Sign In</button>
                        <span>Don't have an account? <Link to="/register">Sign Up</Link></span>
                    </div>
                </div>
            </section>
        </BasePage>
    )
}
