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
            2023 &copy; all right reserved.
        </footer>
    </>
}
