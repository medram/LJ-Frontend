import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Heading from "../components/Heading"
import { usePage } from "../hooks"
import NotFoundPage from "./NotFoundPage"


export default function PagePage()
{
    const { slug } = useParams()
    const { isError, error, page } = usePage(slug as string)

    if (isError)
    {
        if (error.response.status === 404)
        {
            return <NotFoundPage />
        }

        toast.error(error.message)
    }

    return (
        <>
            <Heading title={page.title} subTitle={`Home > ${page.title}`}></Heading>
            <article className="container my-5 px-5" style={{ minHeight: "300px", minWidth: "50%" }} dangerouslySetInnerHTML={{ __html: page.content }}>

            </article>
        </>
    )
}
