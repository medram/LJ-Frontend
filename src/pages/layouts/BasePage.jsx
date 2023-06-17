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
            <footer className="container">
                {new Date().getUTCFullYear()} &copy; all right reserved.
            </footer>
        )}
    </>
}
