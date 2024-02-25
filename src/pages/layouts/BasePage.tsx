import SectionErrorBoundary from "@/components/SectionErrorBoundary";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import { ReactNode } from "react";

type BasePageProps = {
    children?: ReactNode,
    showFooter?: boolean
}

export default function BasePage({ children, showFooter=true }: BasePageProps) {
    return <SectionErrorBoundary>
        <header>
            <Navbar />
        </header>
        <main>
            <SectionErrorBoundary>
                { children }
            </SectionErrorBoundary>
        </main>
        {showFooter && (
            <Footer />
        )}
    </SectionErrorBoundary>
}
