import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BasePage from "./layouts/BasePage";
import { faArrowRightLong, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Confetti from 'react-confetti'
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";


export default function ThankYouPage()
{
    const [confetti, runConfetti] = useState(false)
    const width = window.innerWidth
    const height = window.innerHeight

    const [searchParams] = useSearchParams()
    const type = searchParams.get("t")
    const id = searchParams.get("ref")

    useEffect(() => {
        runConfetti(true)
    }, [])


    return (
        <BasePage>
            <Confetti width={width} height={height} recycle={false} run={confetti} numberOfPieces={400} gravity={0.05} />
            <div className="d-flex justify-content-center align-items-center flex-column py-5 mt-5">
                <FontAwesomeIcon icon={faCircleCheck} className="text-success" style={{fontSize: "10rem"}} />

                <h1 className="h1 text-success mt-5">Congratulations</h1>
            </div>
            <section className="container mb-4 d-flex justify-content-center">
                <div className="mb-3 text-center w-lg-50">
                    {type === "sub" ? (
                        <div className="h4">
                            Your Subscription has been Successfully Enabled.<br />
                            <div className="text-muted h4 mt-3"><i>Order ID: #{id}</i></div>
                        </div>
                    ) : (
                        <p className="h3">Your Order Successfully Compleated.</p>
                    )}

                    <Link to="/account" className="btn btn-outline-primary mt-2" >Go to my Account <FontAwesomeIcon icon={faArrowRightLong} /></Link>
                </div>
            </section>
        </BasePage>
    )
}
