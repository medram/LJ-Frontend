import { PageType } from "@/utils/types"
import { Link } from "react-router-dom"
import { usePages } from "../hooks"



export default function Footer()
{
    const { isLoading, isError, error, pages } = usePages()

    return (
        <footer className="container">
            {new Date().getUTCFullYear()} &copy; all right reserved.
            <div className="d-flex justify-content-center gap-3">
                {pages?.map((page: PageType, i: number) => {
                    if ("slug" in page && "title" in page && typeof page.title === "string")
                        return <Link to={`/p/${page.slug}`} key={i} >{page.title}</Link>
                })}
            </div>
        </footer>
    )
}
