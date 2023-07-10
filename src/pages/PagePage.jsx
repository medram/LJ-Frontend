import { useParams } from "react-router-dom"
import Heading from "../components/Heading"
import BasePage from "./layouts/BasePage"
import SectionLoading from "../components/SectionLoading"
import { toast } from "react-toastify"
import { usePage } from "../hooks"


export default function PagePage()
{
    const { slug } = useParams()
    const { isLoading, isError, error, page={} } = usePage(slug)

    if (isLoading || !Object.keys(page).length)
    {
        return <SectionLoading center={true} />
    }

    if (isError)
    {
        toast.error(error)
    }


    return (
        <BasePage>
            <Heading title={page.title} subTitle={`Page > ${page.title}`}></Heading>

            <article className="container my-5 px-5" style={{ minHeight: "300px" }} dangerouslySetInnerHTML={{ __html: page.content }}>

            </article>
        </BasePage>
    )
}
