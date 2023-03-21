import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"


export default function PricingCards()
{
    return (
        <div className="pricing-section">
            <div className="pricing-card">
                <div className="pricing-title">Free</div>
                <div className="pricing">$2.99<span className="small-text">/month</span></div>
                <div className="pricing-body">
                    <ul>
                        <li><FontAwesomeIcon icon={faCheck} className="text-success" /> Feature 1</li>
                        <li><FontAwesomeIcon icon={faCheck} className="text-success" /> Feature 2</li>
                        <li className="text-muted"><FontAwesomeIcon icon={faXmark} /> Feature 3</li>
                        <li className="text-muted"><FontAwesomeIcon icon={faXmark} /> Feature 4</li>
                        <li className="text-muted"><FontAwesomeIcon icon={faXmark} /> Feature 5</li>
                    </ul>
                </div>
                <Link className="btn btn-primary btn-lg d-block" >Order Now</Link>
            </div>

            <div className="pricing-card popular">
                <div className="pricing-title">Standard</div>
                <div className="pricing">$4.99<span className="small-text">/month</span></div>
                <div className="pricing-body">
                    <ul>
                        <li><FontAwesomeIcon icon={faCheck} className="text-success" /> Feature 1</li>
                        <li><FontAwesomeIcon icon={faCheck} className="text-success" /> Feature 2</li>
                        <li><FontAwesomeIcon icon={faCheck} className="text-success" /> Feature 3</li>
                        <li className="text-muted"><FontAwesomeIcon icon={faXmark} /> Feature 4</li>
                        <li className="text-muted"><FontAwesomeIcon icon={faXmark} /> Feature 5</li>
                    </ul>
                </div>
                <Link className="btn btn-primary btn-lg d-block" >Order Now</Link>
            </div>

            <div className="pricing-card">
                <div className="pricing-title">Premium</div>
                <div className="pricing">$9.48<span className="small-text">/month</span></div>
                <div className="pricing-body">
                    <ul>
                        <li><FontAwesomeIcon icon={faCheck} className="text-success" /> Feature 1</li>
                        <li><FontAwesomeIcon icon={faCheck} className="text-success" /> Feature 2</li>
                        <li><FontAwesomeIcon icon={faCheck} className="text-success" /> Feature 3</li>
                        <li><FontAwesomeIcon icon={faCheck} className="text-success" /> Feature 4</li>
                        <li><FontAwesomeIcon icon={faCheck} className="text-success" /> Feature 5</li>
                    </ul>
                </div>
                <Link className="btn btn-primary btn-lg d-block" >Order Now</Link>
            </div>
        </div>
    )
}
