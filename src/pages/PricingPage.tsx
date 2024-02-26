import Heading from "@components/Heading";
import PricingCards from "@components/PricingCards";
import { useState } from "react";
import BasePage from "./layouts/BasePage";


export default function PricingPage() {

    const [ yearly, setYearly ] = useState(false)

    return (
        <BasePage>
            <Heading title="Pricing" subTitle="Home > Pricing"></Heading>
            <section className="container">
                <div className="d-flex justify-content-center mt-5 mb-3">
                    <div className="btn-group btn-group-sm">
                        <button type="button" className={["btn btn-primary", yearly && "active"].join(" ")} onClick={() => setYearly(false)}><b>Monthly</b></button>
                        <button type="button" className={["btn btn-primary", !yearly && "active"].join(" ")} onClick={() => setYearly(true)}><b>Yearly</b></button>
                    </div>
                </div>

                <PricingCards yearly={yearly} />
            </section>
        </BasePage>
    )
}
