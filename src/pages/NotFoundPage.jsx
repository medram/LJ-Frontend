import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import BasePage from "./layouts/BasePage";


export default function NotFoundPage()
{
    return (
        <BasePage>
            <section className="container not-found-page">
                <h1>404 Not Found!</h1>
                <p className="text-muted">Page doesn't exist or deleted lately!</p>
                <Link to="/" className="btn btn-outline-primary"><FontAwesomeIcon icon={faArrowLeftLong} /> Go Home</Link>
            </section>
        </BasePage>
    )
}
