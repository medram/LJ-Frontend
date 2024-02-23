import { useParams } from "react-router-dom"
import Heading from "../components/Heading"
import BasePage from "./layouts/BasePage"
import SectionLoading from "../components/SectionLoading"
import { toast } from "react-toastify"
import { usePage } from "../hooks"
import NotFoundPage from "./NotFoundPage"


export default function PagePage()
{
    const { slug } = useParams()
    const { isLoading, isError, error, page={} } = usePage(slug)

    if (isError)
    {
        if (error.response.status === 404)
        {
            return <NotFoundPage />
        }

        toast.error(error.message)
    }

    if (isLoading || !Object.keys(page).length)
    {
        return <SectionLoading center={true} />
    }


    return (
        <BasePage>
            <Heading title={page.title} subTitle={`Home > ${page.title}`}></Heading>

            <article className="container my-5 px-5" style={{ minHeight: "300px" }} dangerouslySetInnerHTML={{ __html: page.content }}>

            </article>
        </BasePage>
    )
}
