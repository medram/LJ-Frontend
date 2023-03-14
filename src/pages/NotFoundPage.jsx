import { Link } from "react-router-dom";
import BasePage from "./layouts/BasePage";
import FeatherIcon from "feather-icons-react"



export default function NotFoundPage()
{
    return (
        <BasePage>
            <section className="container not-found-page">
                <h1>404 Not Found!</h1>
                <p className="text-muted">Page doesn't exist or deleted lately!</p>
                <Link to="/" className="btn btn-outline-primary"><FeatherIcon icon="arrow-left" /> Go Home</Link>
            </section>
        </BasePage>
    )
}
