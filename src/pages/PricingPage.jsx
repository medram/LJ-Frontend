import Heading from "../components/Heading";
import PricingCards from "../components/PricingCards";
import BasePage from "./layouts/BasePage";


export default function PricingPage() {
    return (
        <BasePage>
            <Heading title="Pricing" subTitle="Very affordable pricing"></Heading>
            <section className="container">
                <PricingCards />
            </section>
        </BasePage>
    )
}
