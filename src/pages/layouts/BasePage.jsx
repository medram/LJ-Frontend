import Navbar from "../../components/Navbar";


export default function BasePage({ children }) {
    return <>
        <header>
            <Navbar />
        </header>
        <main>
            { children }
        </main>
        <footer className="container">
            {new Date().getUTCFullYear()} &copy; all right reserved.
        </footer>
    </>
}
