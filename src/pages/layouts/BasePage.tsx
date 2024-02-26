import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import SectionSuspense from "@/components/SectionSuspense";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

type BasePageProps = {
    children?: ReactNode,
    showFooter?: boolean
}

export default function BasePage({ children, showFooter=true }: BasePageProps) {
    const location = useLocation()

    return (
        <SectionErrorBoundary key={location.pathname}>
            <header>
                <Navbar />
            </header>
            <main style={{minHeight: "76dvh"}}>
                <SectionErrorBoundary key={location.pathname}>
                    <SectionSuspense>
                        { children }
                    </SectionSuspense>
                </SectionErrorBoundary>
            </main>
            {showFooter && (
                <Footer />
            )}
        </SectionErrorBoundary>
    )
}
