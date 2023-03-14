import FeatherIcon from "feather-icons-react"
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
                        <li><FeatherIcon icon="check" className="text-success" /> Feature 1</li>
                        <li><FeatherIcon icon="check" className="text-success" /> Feature 2</li>
                        <li className="text-muted"><FeatherIcon icon="x" /> Feature 3</li>
                        <li className="text-muted"><FeatherIcon icon="x" /> Feature 4</li>
                        <li className="text-muted"><FeatherIcon icon="x" /> Feature 5</li>
                    </ul>
                </div>
                <Link className="btn btn-primary btn-lg d-block" >Order Now</Link>
            </div>

            <div className="pricing-card popular">
                <div className="pricing-title">Standard</div>
                <div className="pricing">$4.99<span className="small-text">/month</span></div>
                <div className="pricing-body">
                    <ul>
                        <li><FeatherIcon icon="check" className="text-success" /> Feature 1</li>
                        <li><FeatherIcon icon="check" className="text-success" /> Feature 2</li>
                        <li><FeatherIcon icon="check" className="text-success" /> Feature 3</li>
                        <li className="text-muted"><FeatherIcon icon="x" /> Feature 4</li>
                        <li className="text-muted"><FeatherIcon icon="x" /> Feature 5</li>
                    </ul>
                </div>
                <Link className="btn btn-primary btn-lg d-block" >Order Now</Link>
            </div>

            <div className="pricing-card">
                <div className="pricing-title">Premium</div>
                <div className="pricing">$9.48<span className="small-text">/month</span></div>
                <div className="pricing-body">
                    <ul>
                        <li><FeatherIcon icon="check" className="text-success" /> Feature 1</li>
                        <li><FeatherIcon icon="check" className="text-success" /> Feature 2</li>
                        <li><FeatherIcon icon="check" className="text-success" /> Feature 3</li>
                        <li><FeatherIcon icon="check" className="text-success" /> Feature 4</li>
                        <li><FeatherIcon icon="check" className="text-success" /> Feature 5</li>
                    </ul>
                </div>
                <Link className="btn btn-primary btn-lg d-block" >Order Now</Link>
            </div>
        </div>
    )
}
