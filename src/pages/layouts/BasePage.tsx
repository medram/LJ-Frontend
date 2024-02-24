import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import { ReactNode } from "react";

type BasePageProps = {
    children?: ReactNode,
    showFooter?: boolean
}

export default function BasePage({ children, showFooter=true }: BasePageProps) {
    return <>
        <header>
            <Navbar />
        </header>
        <main>
            { children }
        </main>
        {showFooter && (
            <Footer />
        )}
    </>
}
