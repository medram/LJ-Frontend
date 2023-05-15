import { useState } from "react";
import Heading from "../components/Heading";
import PricingCards from "../components/PricingCards";
import Switch from "../components/Switch";
import BasePage from "./layouts/BasePage";


export default function PricingPage() {

    const [ yearly, setYearly ] = useState(false)

    return (
        <BasePage>
            <Heading title="Pricing" subTitle="Home > Pricing"></Heading>
            <section className="container">
                <div className="d-flex justify-content-center mt-5 mb-3">
                    <label htmlFor="yearly" className="form-label text-primary" style={{cursor: "pointer"}} onClick={() => setYearly(false)} > <b>Monthly</b></label>

                    <Switch onChange={(checked) => setYearly(!yearly)} name="yearly" checked={yearly} size="small" className="mx-2 mt-1" />

                    <label htmlFor="yearly" className="form-label text-primary" style={{cursor: "pointer"}} onClick={() => setYearly(true)} > <b>Yearly</b></label>
                </div>

                <PricingCards yearly={yearly} />
            </section>
        </BasePage>
    )
}
