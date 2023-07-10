import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";


export default function BasePage({ children, showFooter=true }) {
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
